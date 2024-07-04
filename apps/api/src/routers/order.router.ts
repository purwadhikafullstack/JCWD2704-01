import { Router } from 'express';
import { OrderController } from '@/controllers/order.controller';
import { zod } from '@/middlewares/zod';
import { createOrderSchema } from '@/libs/zod/orderSchema';

class OrderRouter {
  private router: Router;
  private controller = new OrderController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      zod(createOrderSchema),
      this.controller.createCutomerOrder,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new OrderRouter();
