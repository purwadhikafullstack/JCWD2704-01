import { StockHistoryController } from '@/controllers/stockHistory.controller';
import storeController from '@/controllers/store.controller';
import { StoreStockController } from '@/controllers/storeStock.controller';
import { getNearestStoreSchema } from '@/libs/zod-schemas/store.schema';
import { checkIsStockAssigned, checkIsStockExist, validateInitStock, validateUpdateStock } from '@/middlewares/store.middleware';
import userMiddleware from '@/middlewares/user.middleware';
import { zod } from '@/middlewares/zod';
import { query, Router } from 'express';

export class StoreRouter {
  private router: Router;
  storeStockController: StoreStockController;
  stockHistoryController: StockHistoryController;
  constructor() {
    this.router = Router();
    this.storeStockController = new StoreStockController();
    this.stockHistoryController = new StockHistoryController();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get('/nearest', zod(getNearestStoreSchema, 'query'), storeController.getNearestStore);
    this.router.get('/list', userMiddleware.accessToken, storeController.getStoreList);
    this.router.get('/products/:id', this.storeStockController.getProductByStoreId);
    this.router.get('/names-ids', storeController.getStoreNamesIds);
    this.router.get('/stocks', this.storeStockController.getStoreStocks);
    this.router.get('/stocks/histories', this.stockHistoryController.getStockHistories);
    this.router.post('/stocks', checkIsStockAssigned, validateInitStock, this.storeStockController.initStock);
    this.router.patch('/stocks/:id', checkIsStockExist, validateUpdateStock, this.storeStockController.updateStock);
  }
  getRouter(): Router {
    return this.router;
  }
}

export default new StoreRouter();
