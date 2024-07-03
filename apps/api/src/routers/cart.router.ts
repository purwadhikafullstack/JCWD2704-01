import { CartController } from '@/controllers/cart.controller';
import { Router } from 'express';

class CartRouter {
  private router: Router;
  private controller = new CartController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/:id', this.controller.getCartByUserId);
    this.router.post('/', this.controller.upsetCart);
    this.router.delete('/', this.controller.deleteFromCart);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new CartRouter();
