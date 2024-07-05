import { BadRequestError, catchAllErrors, NotFoundError } from '@/utils/error';
import { stockChangeHandlerSchema } from '@/libs/zod/stockHistorySchema';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

export class StockHistoryService {
  async stockChangeHandler(
    prisma: Prisma.TransactionClient,
    { list, reference, changeAll }: z.infer<typeof stockChangeHandlerSchema>,
  ) {
    //Get Product Detail
    const p = await Promise.all(
      list.map(async ({ id }, i) => {
        const product = await prisma.storeStock.findUnique({
          where: { id: id },
        });
        if (!product) throw new NotFoundError('Product not found');
        return product;
      }),
    );

    //Change Stock
    const history = await prisma.stockHistory.createMany({
      data: list.map((e, i) => ({
        reference,
        start_qty_at: p[i].quantity,
        qty_change: e.quantity * (changeAll == 'increase' ? 1 : -1),
        store_stock_id: p[i].id,
      })),
    });
    return history;
  }
}
export default new StockHistoryService();
