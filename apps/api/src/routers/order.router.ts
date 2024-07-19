import { Router } from 'express';
import orderController, { OrderController } from '@/controllers/order.controller';
import { zod } from '@/middlewares/zod';
import { createOrderSchema, rajaOngkirCostQuerySchema } from '@/libs/zod-schemas/order.schema';
import { verifyAdminAccToken } from '@/middlewares/admin.middleware';
import userMiddleware from '@/middlewares/user.middleware';
import { blobUploader } from '@/libs/multer';

class OrderRouter {
  private router: Router;
  private controller = orderController;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', userMiddleware.accessToken, this.controller.getOrderList);
    this.router.get(
      '/shipcost',
      // verifyAdminAccToken,
      zod(rajaOngkirCostQuerySchema, 'query'),
      this.controller.getShipCost,
    );
    this.router.get('/:inv', userMiddleware.accessToken, this.controller.getOrderByInv);

    this.router.post('/', userMiddleware.accessToken, zod(createOrderSchema), this.controller.createCutomerOrder);

    this.router.patch('/:inv/v1', blobUploader().single('img'), verifyAdminAccToken, this.controller.uploadPaymentProof);
    this.router.patch('/:inv/v2', verifyAdminAccToken, this.controller.cancelOrder);
    this.router.patch('/:inv/v3', verifyAdminAccToken, this.controller.approveOrderPayment);
    this.router.patch('/:inv/v4', verifyAdminAccToken, this.controller.sendingOrder);
    this.router.patch('/:inv/v5', verifyAdminAccToken, this.controller.orderDelivered);
    // this.router.update("/:inv",this.controller.cancelOrder)
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new OrderRouter();
