import { stockChangeHandlerSchema } from '@/libs/zod-schemas/stockHistory.schema';
import { BadRequestError, InternalServerError, NotFoundError } from '@/utils/error';
import { Prisma } from '@prisma/client';
import { rejects } from 'assert';
// import { products } from 'prisma/data/products';
import { z } from 'zod';

export class StockHistoryService {
  async stockChangeHandler(prisma: Prisma.TransactionClient, { list, reference, changeAll }: z.infer<typeof stockChangeHandlerSchema>) {
    //Get Product Detail
    const p = await Promise.all(
      list.map(async ({ id, quantity }, i) => {
        const product = await prisma.storeStock.findUnique({
          where: { id: id },
        });
        !product
          ? await new Promise((resolve, reject) => {
              reject(new NotFoundError('product not found'));
            })
          : product.quantity >= quantity
            ? null
            : await new Promise((resolve, reject) => {
                reject(new BadRequestError('Cannot buy product more than available stock'));
              });
        if (!product) throw new NotFoundError('product not found');
        return product;
      }),
    );

    //Create History
    const history = await prisma.stockHistory.createMany({
      data: list.map((e, i) => ({
        reference,
        start_qty_at: p[i].quantity,
        qty_change: e.quantity * (changeAll == 'increment' ? 1 : -1),
        store_stock_id: p[i].id,
      })),
    });

    // Change Stock
    await Promise.all(
      list.map(async ({ id, quantity }) => {
        const a = await prisma.storeStock.update({
          where: { id },
          data: { quantity: { [changeAll]: quantity } },
        });
      }),
    );

    return history;
  }
}
export default new StockHistoryService();
