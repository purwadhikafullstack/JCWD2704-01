import { CartController } from '@/controllers/cart.controller';
import { deleteCartSchema, upsertCartSchema } from '@/libs/zod/cartSchema';
import { zod } from '@/middlewares/zod';
import { NextFunction, Request, Response, Router } from 'express';

class CartRouter {
  private router: Router;
  private controller = new CartController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.controller.getCartByUserId);

    this.router.post('/', zod(upsertCartSchema), this.controller.upsetCart);

    this.router.delete(
      '/',
      zod(deleteCartSchema),
      this.controller.deleteFromCart,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new CartRouter();
