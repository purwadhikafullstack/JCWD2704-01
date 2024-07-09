/** @format */
import { Request } from 'express';
import { prisma } from '@/libs/prisma';
import { invGenerate } from '@/utils/invGenerate';
import { z } from 'zod';
import {
  createOrderSchema,
  rajaOngkirCostQuerySchema,
} from '@/libs/zod-schemas/order.schema';
import { AuthError, BadRequestError } from '@/utils/error';
import stockHistoryService from './stockHistory.service';
import storeStockService from './storeStock.service';
import { getShipCost } from '@/utils/other-api/getShipCost';
import promotionService from './promotion';

export class Order2Service {
  async getShipCost(req: Request) {
    getShipCost(req.query as z.infer<typeof rajaOngkirCostQuerySchema>);
  }

  async createOrder(req: Request) {
    const {
      destination_id,
      promotion_id,
      store_id,
      req_products,
      courier,
      courier_service,
    } = req.body as z.infer<typeof createOrderSchema>;
    const user_id = 'cly5w0lzg00020cjugmwqa7zf';
    // const user_id = req.user.id;
    // if (!user_id || req.user.role != 'customer')
    //   throw new AuthError('not authorized, please login');
    // get product data
    const products = await Promise.all(
      req_products.map(async ({ id, quantity }, i) => {
        const productData = await storeStockService.getStoreStockById(id);
        return { quantity, productData };
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

    const rajaOngkirParam = {
      origin: store_id,
      destination: destination_id,
      courier,
      weight: products.reduce(
        (p, s) => p + s.quantity * s.productData.product.weight,
        0,
      ),
    };

    const shipping_cost = (
      await getShipCost(rajaOngkirParam as any)
    ).rajaongkir.results[0].costs.find((e) => e.service == courier_service)
      ?.cost[0].value;
    if (!shipping_cost) throw new BadRequestError('Invalid courier_service');

    //Promotion Logic
    const totalPrice = products.reduce(
      (p, s) =>
        p + s.quantity * (s.productData.unit_price - s.productData.discount),
      0,
    );
    const discount = !promotion_id
      ? 0
      : await promotionService.applyVocher({
          shipCost: shipping_cost,
          total: totalPrice,
          promoId: promotion_id,
        });
    //End Promotion Logic

    let result: any;
    await prisma.$transaction(async (prisma) => {
      try {
        // copy address
        const destination_id = (
          await prisma.address.create({
            data: {
              ...{ ...destination, user_id: undefined, id: undefined },
              type: 'origin',
            },
            select: { id: true },
          })
        ).id;

        const origin_id = (
          await prisma.address.create({
            data: { ...origin, id: undefined, type: 'origin' },
            select: { id: true },
          })
        ).id;

        // Create order
        const order = await prisma.customerOrders.create({
          include: { order_details: true },
          data: {
            expire: new Date(new Date().getTime() + 1000 * 3600).toISOString(),
            user_id: 'cly5vk76k00000dmg78mgfo4y',
            inv_no: invGenerate('cly5vk76k00000dmg78mgfo4y'),
            shipping_cost,
            promotion_id,
            discount,
            store_id,
            destination_id,
            origin_id,

            order_details: {
              createMany: {
                data: products.map((e, i) => ({
                  discount: e.productData.discount,
                  quantity: e.quantity,
                  unit_price: e.productData.unit_price,
                  store_stock_id: e.productData.id,
                })),
              },
            },
          },
        });

        // Create History & Change Stock
        await stockHistoryService.stockChangeHandler(prisma, {
          list: req_products,
          changeAll: 'decrement',
          reference: 'sell product',
        });
        result = order;
      } catch (error) {
        result = error;
      }
    });

    if (result instanceof Error) throw new Error(result.message);
    return { ...result, total: totalPrice - discount };
  }

  async confirmPayment(req: Request) {
    if (req.user.role == 'customer') throw new AuthError('user not authorized');
    const { store_id, inv_no } = req.body;
    return await prisma.customerOrders.update({
      where: {
        inv_no,
        payment_proof: { not: null },
        store: {
          address_id: store_id,
          store_admin_id: req.user.id,
        },
      },
      data: {
        status: 'process',
      },
    });
  }
}
export default new Order2Service();
