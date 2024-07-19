import storeController from '@/controllers/store.controller';
import { getNearestStoreSchema } from '@/libs/zod-schemas/store.schema';
import userMiddleware from '@/middlewares/user.middleware';
import { zod } from '@/middlewares/zod';
import { query, Router } from 'express';

export class StoreRouter {
  private router: Router;
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get('/nearest', zod(getNearestStoreSchema, 'query'), storeController.getNearestStore);
    this.router.get('/list', userMiddleware.accessToken, storeController.getStoreList);
  }
  getRouter(): Router {
    return this.router;
  }
}

export default new StoreRouter();
