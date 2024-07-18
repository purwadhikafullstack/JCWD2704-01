/** @format */
import { Request } from 'express';
import { prisma } from '@/libs/prisma';
import { AuthError, BadRequestError, NotFoundError } from '@/utils/error';
import { OrderStatus, Prisma } from '@prisma/client';
async function orderPermision(inv: string, user: Request['user'], allowUser: boolean = true, allowStoreAdmin: boolean = true) {
  if (!user) throw new AuthError();
  const orderData = await prisma.customerOrders.findUnique({
    where: { inv_no: inv },
    include: { store: true },
  });
  if (!orderData) throw new NotFoundError('no order with that invoice');
  const { id, role } = user;
  if (role == 'customer' && id != orderData.user_id && allowUser) throw new AuthError();
  if (role == 'store_admin' && id != orderData.store.store_admin_id && allowStoreAdmin) throw new AuthError();
  return { inv, user, role };
}

export class OrderService {
  async getOrderList(req: Request) {
    const { before, after, asc, store_id, pn, inv } = req.query as { [k: string]: string | undefined };
    const page = req.query.page ? Number(req.query.page) : 1;
    const status = req.query.status as OrderStatus | undefined;
    if (!req.user) throw new AuthError();
    const where: Prisma.CustomerOrdersWhereInput = {
      // Customer Fillter
      user_id: req.user.role == 'customer' ? req.user.id : (req.query.user_id as string | undefined),
      // Store Fillter
      store: {
        AND: [req.user.role == 'store_admin' ? { store_admin: { some: { id: req.user.id } } } : {}, { address_id: store_id }],
      },
      //invoice fillter
      inv_no: { contains: inv || '' },
      // Date Fillter
      created_at: {
        ...(before ? { lt: new Date(Number(before)) } : {}),
        ...(after ? { gt: new Date(Number(after)) } : {}),
      },
      // By Status
      status: status ? status : undefined,
      // Fillter by product
      ...(pn
        ? {
            order_details: {
              some: {
                store_stock: {
                  product: { name: { contains: pn } },
                },
              },
            },
          }
        : {}),
      //End Fillter by product
    };
    const { _count } = await prisma.customerOrders.aggregate({ _count: { id: true }, where });
    const orders = await prisma.customerOrders.findMany({
      select: { inv_no: true },
      orderBy: { created_at: asc ? 'asc' : 'desc' },
      skip: 0 * page,
      take: 20,
      where,
    });
    const result = { data: orders, page: { now: page, end: Math.ceil(_count.id / 20) } };
    console.log('LIMIT', result);
    return result;
  }

  async getOrderByInv(req: Request) {
    const { inv, user, role } = await orderPermision(req.params.inv, req.user);
    const result = await prisma.customerOrders.findUnique({
      where: {
        inv_no: inv,
        user_id: role == 'customer' ? user.id : undefined,
        ...(role == 'store_admin' && { store: { store_admin: { some: { id: user.id } } } }),
      },
      include: {
        payment_proof: true,
        order_details: {
          include: {
            store_stock: {
              include: { product: { include: { product: true } } },
            },
          },
        },
        origin: true,
        user: true,
        promotion: true,
        stock_histories: role !== 'customer',
      },
    });
    if (!result) throw new NotFoundError('Order data not found');
    return result;
  }

  async uploadPaymentProof(req: Request) {
    const { inv: inv_no, role } = await orderPermision(req.params.inv, req.user);
    if (role != 'customer') throw new AuthError();
    if (!req.file) throw new BadRequestError('upload payment proof image');
    const { buffer, filename, mimetype } = req.file;
    return await prisma.customerOrders.update({
      where: { inv_no, user_id: req.user?.id, expire: { lt: new Date().toISOString() } },
      data: {
        status: 'wait_for_confirmation',
        payment_proof: {
          create: { name: `${filename}.${mimetype}`, blob: buffer },
        },
      },
    });
  }

  async orderAutoHandler() {
    try {
      await prisma.customerOrders.updateMany({
        where: {
          status: 'wait_for_payment',
          expire: { lte: new Date() },
        },
        data: { status: 'canceled' },
      });

      await prisma.customerOrders.updateMany({
        where: {
          status: 'sending',
          expire: { lte: new Date() },
        },
        data: {
          status: 'sended',
        },
      });
    } catch (error) {}
  }

  async approveOrderPayment(req: Request) {
    const { inv: inv_no, role } = await orderPermision(req.params.inv, req.user, false);
    if (role == 'customer') throw new AuthError();
    return await prisma.customerOrders.update({
      where: { inv_no },
      data: { status: 'process' },
    });
  }

  async sendingOrder(req: Request) {
    const { inv: inv_no } = await orderPermision(req.params.inv, req.user, false);
    return await prisma.customerOrders.update({
      where: { inv_no },
      data: { status: 'sending', expire: new Date(new Date().getTime() + 1000 * 3600 * 24 * 7) },
    });
  }
  async cancelOrder(req: Request) {
    const { inv: inv_no } = await orderPermision(req.params.inv, req.user);
    return await prisma.customerOrders.update({
      where: { inv_no },
      data: { status: 'canceled' },
    });
  }

  async orderDelivered(req: Request) {
    if (!req.user) throw new AuthError();
    const order = await prisma.customerOrders.update({
      where: { inv_no: req.params.inv, user_id: req.user.id },
      data: { status: 'sended' },
    });
    if (!order) throw new NotFoundError('order not found');
    return order;
  }
}
export default new OrderService();
