import { Router } from 'express';
import orderController, {
  OrderController,
} from '@/controllers/order.controller';
import { zod } from '@/middlewares/zod';
import {
  createOrderSchema,
  rajaOngkirCostQuerySchema,
} from '@/libs/zod-schemas/order.schema';
import { verifyAdminAccToken } from '@/middlewares/admin.middleware';

class OrderRouter {
  private router: Router;
  private controller = orderController;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', verifyAdminAccToken, this.controller.getOrderList);
    this.router.get(
      '/shipcost',
      verifyAdminAccToken,
      zod(rajaOngkirCostQuerySchema, 'query'),
      this.controller.getShipCost,
    );
    this.router.get(
      '/:inv',
      verifyAdminAccToken,
      this.controller.getOrderByInv,
    );

    this.router.post(
      '/',
      verifyAdminAccToken,
      zod(createOrderSchema),
      this.controller.createCutomerOrder,
    );

    this.router.patch(
      '/:inv',
      verifyAdminAccToken,
      this.controller.uploadPaymentProof,
    );
    // this.router.update("/:inv",this.controller.cancelOrder)
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new OrderRouter();
