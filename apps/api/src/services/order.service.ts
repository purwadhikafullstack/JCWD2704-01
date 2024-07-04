/** @format */
import { Request } from 'express';
import { prisma } from '@/libs/prisma';
import { invGenerate } from '@/utils/invGenerate';
import { z } from 'zod';
import { createOrderSchema } from '@/libs/zod/orderSchema';

export class OrderService {
  async getOrderByInv(req: Request) {
    const result = await prisma.customerOrders.findUnique({
      where: { inv_no: req.body.inv },
      include: {
        order_details: {
          include: { store_stock: { include: { products: true } } },
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
    const { shipping_cost, promotion_id, store_id, products } =
      req.body as z.infer<typeof createOrderSchema>;
    const user_id = req.user.id;
    const total = products.reduce(
      (p, s) => p + s.quantity * s.store_stock.products.unit_price,
      0,
    );

    if (!products.every((e) => e.store_stock_id == store_id))
      throw new Error('Invalid Product In Store');

    const discount = products.reduce(
      (p, s) => p + s.quantity * s.store_stock.products.discount,
      0,
    );

    let order: any;
    await prisma.$transaction(async (prisma) => {
      order = await prisma.customerOrders.create({
        include: { order_details: true },
        data: {
          inv_no: invGenerate(user_id),
          shipping_cost,
          promotion_id,
          origin_id: store_id,
          user_id: user_id,
          order_details: {
            createMany: {
              data: products.map((e, i) => ({
                discount: e.store_stock.products.discount,
                quantity: e.quantity,
                unit_price: e.store_stock.products.unit_price,
                store_stock_id: e.store_stock_id,
              })),
            },
          },
        },
      });

      products.forEach(async (e, i) => {
        const oldStock = await prisma.storeStock.findUnique({
          where: { id: e.store_stock_id },
          select: { quantity: true },
        });

        if (!oldStock || order?.quantity < e.quantity) {
          order = new Error('invalid products');
          throw order;
        }

        await prisma.stockHistory.createMany({
          data: {
            store_stock_id: e.store_stock_id,
            qty_change: e.quantity,
            transaction_id: order.id,
            reference: 'Products ordered by customer',
            start_qty_at: oldStock.quantity,
          },
        });
        const ne = await prisma.storeStock.update({
          where: { id: e.store_stock_id },
          data: { quantity: { decrement: e.quantity } },
        });
      });
    });

    if (order instanceof Error) throw new Error(order.message);
    return { ...order, total, discount };
  }
}
export default new OrderService();
