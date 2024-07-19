import addressController from '@/controllers/address.controller';
import userMiddleware from '@/middlewares/user.middleware';
import { Router } from 'express';

class AddressRouter {
  private router: Router;
  constructor() {
    this.router = Router();
    this.initializedRoutes();
  }

  private initializedRoutes() {
    this.router.get('/user/:id', userMiddleware.accessToken, addressController.getUserAddresses);
    this.router.get('/store/:id', userMiddleware.accessToken, addressController.getUserAddresses);
  }

  public getRouter() {
    return this.router;
  }
}

export default new AddressRouter();
