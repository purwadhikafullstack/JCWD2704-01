import addressController from '@/controllers/address.controller';
import userMiddleware from '@/middlewares/user.middleware';
import { NextFunction, Request, Response, Router } from 'express';

class AddressRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/:user_id', userMiddleware.accessToken, addressController.getUserAddresses);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new AddressRouter();
