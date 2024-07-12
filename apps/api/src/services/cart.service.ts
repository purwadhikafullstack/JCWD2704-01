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
    const s = req.body.search;
    return await prisma.cart.findMany({
      include: {
        store_stock: { include: { product: { include: { product: true } } } },
      },
      where: {
        // user_id: req.user.id,
        user_id: 'cly5w0lzg00020cjugmwqa7zf',
        ...(s ? { store_stock: { product: { name: { contains: s } } } } : {}),
      },
    });
  }

  async getCountCart(req: Request) {
    const user_id = 'cly5w0lzg00020cjugmwqa7zf';
    return {
      count: (
        await prisma.cart.aggregate({
          _count: { store_stock_id: true },
          where: { user_id },
        })
      )._count,
    };
  }

  async upsertCart(req: Request) {
    const user_id = 'cly5w0lzg00020cjugmwqa7zf';
    // const user_id = req.user.id;
    // if (!user_id || req.user.role != 'customer')
    //   throw new AuthError('not authorized');
    const { quantity, store_stock_id } = req.body as z.infer<
      typeof upsertCartSchema
    >;
    console.log(quantity);
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
    const user_id = 'cly5w0lzg00020cjugmwqa7zf';
    // const user_id = req.user.id;
    // if (!user_id || req.user.role != 'customer')
    //   throw new AuthError('not authorized');
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
