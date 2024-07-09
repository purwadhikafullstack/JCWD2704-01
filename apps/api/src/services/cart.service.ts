import { Request } from 'express';
import { prisma } from '@/libs/prisma';
import { z } from 'zod';
import {
  deleteCartSchema,
  upsertCartSchema,
} from '@/libs/zod-schemas/cart.schema';
import { AuthError, BadRequestError } from '@/utils/error';

export class CartService {
  async getCartByUserId(req: Request) {
    return await prisma.cart.findMany({
      where: { user_id: req.user.id },
    });
  }

  async upsertCart(req: Request) {
    const user_id = req.user.id;
    if (!user_id || req.user.role != 'customer')
      throw new AuthError('not authorized');
    const { quantity, store_stock_id } = req.body as z.infer<
      typeof upsertCartSchema
    >;

    const stock = await prisma.storeStock.findUnique({
      where: { id: store_stock_id },
      select: { quantity: true },
    });

    if (!stock) throw new BadRequestError('invalid storeStockId');

    if (stock.quantity < Number(quantity))
      throw new BadRequestError('quantity higher than stock');

    return await prisma.cart.upsert({
      where: {
        user_id_store_stock_id: {
          user_id,
          store_stock_id,
        },
      },
      update: {
        quantity: Number(quantity),
      },
      create: {
        user_id,
        store_stock_id,
        quantity: quantity,
      },
    });
  }

  async deleteProductInCart(req: Request) {
    const user_id = req.user.id;
    if (!user_id || req.user.role != 'customer')
      throw new AuthError('not authorized');
    const { store_stock_id } = req.body as z.infer<typeof deleteCartSchema>;
    return prisma.cart.delete({
      where: {
        user_id_store_stock_id: {
          user_id,
          store_stock_id,
        },
      },
    });
  }
}
export default new CartService();
