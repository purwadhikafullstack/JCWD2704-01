import promotionController from '@/controllers/promotion.controller';
import userMiddleware from '@/middlewares/user.middleware';
import { Router } from 'express';

class AddressRouter {
  private router: Router;
  constructor() {
    this.router = Router();
    this.initializedRoutes();
  }

  private initializedRoutes() {
    this.router.get('/v0/:promoId', userMiddleware.accessToken, promotionController.testApplyVoucher);
    this.router.get('/user', userMiddleware.accessToken, promotionController.getCustomerVouchers);
  }

  public getRouter() {
    return this.router;
  }
}

export default new AddressRouter();
