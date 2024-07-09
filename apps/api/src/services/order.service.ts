/** @format */
import { Request } from 'express';
import { prisma } from '@/libs/prisma';
import { AuthError, NotFoundError } from '@/utils/error';

export class OrderService {
  async getOrderList(req: Request) {
    const { user_id, before, after, asc, store_id, product_name } = req.query;
    const page = req.query.page ? Number(req.query.page) : 1;

    // User Access Protection
    if (req.user.role == 'customer' && user_id != req.user.id)
      throw new AuthError('user not allowed');

    // Admin Access Protection
    let storeLimit;
    if (req.user.role == 'store_admin') {
      storeLimit = await prisma.store.findMany({
        select: { address_id: true },
        where: {
          store_admin_id: req.user.id,
          ...(store_id ? { address_id: store_id } : {}),
        },
      });
    }

    const result = await prisma.customerOrders.findMany({
      select: { inv_no: true },
      orderBy: { created_at: asc ? 'asc' : 'desc' },
      skip: 0 * page,
      take: 20,
      where: {
        // Customer Fillter
        ...(user_id ? { user_id } : {}),

        // Store Fillter
        ...(req.user.role !== 'store_admin'
          ? { ...(store_id ? { address_id: store_id } : {}) }
          : {
              store: {
                ...(store_id
                  ? {
                      OR: storeLimit?.map((e) => ({
                        address_id: e.address_id,
                      })),
                    }
                  : {
                      OR: storeLimit
                        ?.filter((e) => e.address_id == store_id)
                        .map((e) => ({ address_id: e.address_id })),
                    }),
              },
            }),

        // Date Fillter
        created_at: {
          ...(before ? { gt: new Date(before) } : {}),
          ...(after ? { lt: new Date(after) } : {}),
        },

        // Fillter by product
        ...(product_name
          ? {
              order_details: {
                some: {
                  store_stock: {
                    product: { name: { contains: product_name } },
                  },
                },
              },
            }
          : {}),
        //End Fillter by product
      },
    });
    return result;
  }

  async getOrderByInv(req: Request) {
    const result = await prisma.customerOrders.findUnique({
      where: { inv_no: req.params.inv },
      include: {
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
        stock_histories: req.user.role !== 'customer',
      },
    });

    if (!result) throw new NotFoundError('Order data not found');
    return result;
  }

  async uploadPaymentProof(req: Request) {
    const inv_no = req.params.inv;
    await prisma.customerOrders.update({
      where: { inv_no, user_id: req.user.id },
      data: { status: 'wait_for_confirmation' },
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
    } catch (error) {
      console.log('order autoHandle fail');
    }
  }
}
export default new OrderService();
