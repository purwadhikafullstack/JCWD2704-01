import storeController from '@/controllers/store.controller';
import userMiddleware from '@/middlewares/user.middleware';
import { Router } from 'express';

export class StoreRouter {
  private router: Router;
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get('/nearest', storeController.getNearestStore);
    this.router.get('/list', userMiddleware.accessToken, storeController.getStoreList);
  }
  getRouter(): Router {
    return this.router;
  }
}

export default new StoreRouter();
