import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/utils/error';
import { Request } from 'express';

export class StoreStockService {
  async getStoreStockById(id: string) {
    const result = await prisma.storeStock.findUnique({
      where: { id },
      include: {
        product: {
          include: {
            product: {
              include: { category: { include: { sub_categories: true } } },
            },
          },
        },
      },
    });
    if (!result) throw new NotFoundError('Product not found');
    return result;
  }
}

export default new StoreStockService();
