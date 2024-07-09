import { Request } from 'express';
import { prisma } from '@/libs/prisma';
import { BadRequestError, NotFoundError } from '@/utils/error';
import { CustomerOrders } from '@prisma/client';

export class PromotionService {
  async applyVocher({
    total,
    promoId,
    shipCost,
  }: {
    total: number;
    shipCost: number;
    promoId: string;
  }) {
    const voucher = await prisma.promotion.findUnique({
      where: { id: promoId },
    });
    if (!voucher) throw new NotFoundError('not found voucher');
    if (voucher.expiry_date < new Date())
      throw new BadRequestError('expire voucher');
    if (total >= voucher.min_transaction)
      throw new BadRequestError("doesn't meet the requirements");
    let discount: number = 0;
    switch (voucher.type) {
      case 'discount':
        discount = total * voucher.amount;
        break;
      case 'free_shipping':
        discount = shipCost;
        break;
      case 'voucher':
      case 'referral_voucher':
        discount = voucher.amount < total ? voucher.amount : total;
        break;
    }
    return discount;
  }
}
export default new PromotionService();
