/** @format */
import { Request } from 'express';
import { prisma } from '@/libs/prisma';
import { invGenerate } from '@/utils/invGenerate';
import { z } from 'zod';
import { createOrderSchema } from '@/libs/zod/orderSchema';
import { AuthError, BadRequestError } from '@/utils/error';
import stockHistoryService from './stockHistory.service';

export class OrderService {
  async getOrderList(req: Request) {
    const { user_id, before, after, asc, store_id, product_name } = req.query;

    // User Access Protection
    if (req.user.role == 'user' && user_id != req.user.id)
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
      where: {
        // Customer Fillter
        ...(user_id ? { user_id } : {}),

        // Store Fillter
        ...(req.user.role == 'super_admin'
          ? { ...(store_id ? { address_id: store_id } : {}) }
          : {
              store: {
                OR: storeLimit?.map((e) => ({ address_id: e.address_id })),
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
        stock_histories: true,
      },
    });

    if (req.user.role == 'user')
      return { ...result, stock_histories: undefined };
    return result;
  }

  async createOrder(req: Request) {
    const { destination_id, promotion_id, store_id, req_products } =
      req.body as z.infer<typeof createOrderSchema>;
    const user_id = req.user.id;

    // get product data
    const products = await Promise.all(
      req_products.map(async ({ id }, i) => {
        const productData = await prisma.storeStock.findUnique({
          where: { id },
          include: { product: { include: { product: true } } },
        });
        if (!productData) throw new BadRequestError('Invalid Product ID');
        return productData;
      }),
    );

    //get destination and origin id
    const origin = await prisma.address.findUnique({
      where: { id: store_id },
    });
    if (!origin) throw new BadRequestError('Invalid Store ID');

    const destination = await prisma.address.findUnique({
      where: { id: destination_id },
    });
    if (!destination) throw new BadRequestError('Invalid User Address ID');

    // const shipping_cost =

    //Promotion Logic
    //End Promotion Logic

    let result: any;
    await prisma.$transaction(async (prisma) => {
      try {
        // copy address
        const destination_id = (
          await prisma.address.upsert({
            where: { ...destination, id: undefined, type: 'origin' },
            update: {},
            create: { ...destination, type: 'origin' },
            select: { id: true },
          })
        ).id;

        const origin_id = (
          await prisma.address.upsert({
            where: { ...origin, id: undefined, type: 'origin' },
            update: {},
            create: { ...origin, id: undefined, type: 'origin' },
            select: { id: true },
          })
        ).id;

        // Create order
        const order = await prisma.customerOrders.create({
          include: { order_details: true },
          data: {
            inv_no: invGenerate(user_id),
            shipping_cost: 0,
            promotion_id,
            store_id,
            destination_id,
            origin_id,
            user_id: user_id,

            order_details: {
              createMany: {
                data: products.map((e, i) => ({
                  discount: e.discount,
                  quantity: req_products[i].quantity,
                  unit_price: e.unit_price,
                  store_stock_id: e.id,
                })),
              },
            },
          },
        });

        // Create History
        stockHistoryService.stockChangeHandler(prisma, {
          list: req_products,
          changeAll: 'decrease',
          reference: 'sell product',
        });
        // Change Stock
        await Promise.all(
          order.order_details.map(({ store_stock_id, quantity }) => {
            prisma.storeStock.update({
              where: { id: store_stock_id },
              data: { quantity: { decrement: quantity } },
            });
          }),
        );
      } catch (error) {
        result = error;
      }
    });

    if (result instanceof Error) throw new Error(result.message);
    return result;
  }
}
export default new OrderService();
