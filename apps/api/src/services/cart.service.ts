/** @format */
import { Request } from 'express';
import { prisma } from '@/lib/prisma';

export class CartService {
  async getCartByUserId(req: Request) {
    return await prisma.cart.findMany({
      where: { userId: req.params.id },
    });
  }

  async upsertCart(req: Request) {
    const { storeStockId, userId, quantity } = req.body as {
      [key: string]: string;
    };

    const stock = await prisma.storeStock.findUnique({
      where: { id: storeStockId },
      select: { quantity: true },
    });

    if (!stock) throw new Error('invalid storeStockId');

    if (stock.quantity < Number(quantity))
      throw new Error('quantity higher than stock');

    return await prisma.cart.upsert({
      where: {
        userId_storeStockId: {
          userId,
          storeStockId,
        },
      },
      update: {
        quantity: Number(quantity),
        updatedAt: new Date(),
      },
      create: {
        userId: userId,
        storeStockId: storeStockId,
        quantity: Number(quantity),
      },
    });
  }

  async deleteProductInCart(req: Request) {
    const { storeStockId, userId }: { [key: string]: string } = req.body;
    return prisma.cart.delete({
      where: { userId_storeStockId: { userId, storeStockId } },
    });
  }
}
export default new CartService();
