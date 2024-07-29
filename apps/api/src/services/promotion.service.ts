import { Request } from 'express';
import { prisma } from '@/libs/prisma';
import { AuthError, BadRequestError, NotFoundError } from '@/utils/error';
import { testApplyVoucherSchema } from '@/libs/zod-schemas/promotion.schema';
import { calculateDiscount } from '@/utils/calculateDiscount';

export class PromotionService {
  async applyVocher({ total, promoId, shipCost }: { total: number; shipCost: number; promoId: string},updateValid = true) {
    const where = { id: promoId };
    const voucher = await prisma.promotion.findUnique({
      where,
      include: { user: true },
    });
    if (!voucher) throw new NotFoundError('not found voucher');
    if (voucher.expiry_date < new Date()) throw new BadRequestError('expire voucher');
    if (total >= voucher.min_transaction) throw new BadRequestError("doesn't meet the requirements");
    let discount: number = 0;
    switch (voucher.type) {
      case 'discount':
        discount = calculateDiscount(total, voucher.amount);
        break;
      case 'free_shipping':
        discount = shipCost;
        break;
      case 'voucher':
      case 'referral_voucher':
        discount = voucher.amount < total ? voucher.amount : total;
        break;
    }
    if (voucher.user && updateValid) {
      await prisma.promotion.update({ where, data: { is_valid: false } });
    }
    return discount;
  }

  async testApplyVoucher(req: Request) {
    const { promoId, shipCost, total } = testApplyVoucherSchema.parse({ ...req.query, ...req.params });
    const discount = await this.applyVocher({ promoId, shipCost, total },false);
    return {
      discount,
      total: total - discount,
    };
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
