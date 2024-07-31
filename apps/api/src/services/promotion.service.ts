import { Request } from 'express';
import { prisma } from '@/libs/prisma';
import { AuthError, BadRequestError, NotFoundError } from '@/utils/error';
import { testApplyVoucherSchema } from '@/libs/zod-schemas/promotion.schema';
import { Prisma } from '@prisma/client';
import stockHistoryService from './stockHistory.service';

async function applyVocher({ total, promoId, shipCost }: { total: number; shipCost: number; promoId: string }, updateValid = true) {
  const where = { id: promoId };
  const voucher = await prisma.promotion.findUnique({
    where,
    include: { user: true },
  });
  if (!voucher) throw new NotFoundError('not found voucher');
  if (voucher.expiry_date < new Date()) throw new BadRequestError('expire voucher');
  if (total < voucher.min_transaction) throw new BadRequestError(`min transaction :${voucher.min_transaction}`);
  let discount: number = 0;
  switch (voucher.type) {
    case 'discount':
    case 'referral_voucher':
      discount = (total * voucher.amount) / 100;
      break;
    case 'free_shipping':
      discount = shipCost;
      break;
    case 'voucher':
      discount = voucher.amount < total ? voucher.amount : total;
      break;
    default:
      discount = 0;
  }
  if (voucher.user && updateValid) {
    await prisma.promotion.update({ where, data: { is_valid: false } });
  }
  return discount;
}

export class PromotionService {
  async applyVocher({ total, promoId, shipCost }: { total: number; shipCost: number; promoId: string }, updateValid = true) {
    return await applyVocher({ total, promoId, shipCost });
  }

  async testApplyVoucher(req: Request) {
    const { promoId, shipCost, total } = testApplyVoucherSchema.parse({ ...req.query, ...req.params });
    const discount = await applyVocher({ promoId, shipCost, total }, false);
    return {
      discount,
      total: total - discount,
    };
  }

  async appyBuy1Get1(prisma: Prisma.TransactionClient, storeStock_id: string, quantity: number, transaction_id: string) {
    const isProductPromoValid = await prisma.storeStock.findUnique({ where: { id: storeStock_id, promo: { type: 'buy_get', is_valid: true } } });
    if (isProductPromoValid) {
      await stockHistoryService.stockChangeHandler(
        prisma,
        {
          changeAll: 'decrement',
          list: [{ id: storeStock_id, quantity }],
          reference: 'Buy 1 Get 1 Bonus',
        },
        transaction_id,
      );
    }
  }

  async getCustomerVouchers(req: Request) {
    if (!req.user) throw new AuthError();
    const user_id = req.query.user_id as string | undefined;
    return await prisma.promotion.findMany({
      where: {
        ...(req.user.role == 'customer' ? { user_id: req.user.id } : { user_id: user_id }),
        expiry_date: { gt: new Date().toISOString() },
        is_valid: true,
      },
    });
  }
}
export default new PromotionService();
