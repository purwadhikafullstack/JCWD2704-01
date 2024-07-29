import promotionService from '@/services/promotion.service';
import { EntityController } from './entity.controller';

class PromotionController extends EntityController {
  testApplyVoucher = this.sendResponse({
    service: promotionService.testApplyVoucher,
    response: 'fetch apply voucher result',
  });

  getCustomerVouchers = this.sendResponse({
    service: promotionService.getCustomerVouchers,
    response: 'fetch vouchers',
  });
}

export default new PromotionController();
