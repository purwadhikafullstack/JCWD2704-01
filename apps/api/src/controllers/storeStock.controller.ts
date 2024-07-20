import storeStockService from '@/services/storeStock.service';
import { EntityController } from './entity.controller';
import { Request } from 'express';

export class StoreStockController extends EntityController {
  getStoreStockById = this.sendResponse({
    service: (req: Request) => storeStockService.getStoreStockById(`${req.params?.id}`),
    response: 'fetch product data full detail',
  });
}
