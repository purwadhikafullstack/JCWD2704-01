import storeStockService from '@/services/storeStock.service';
import { EntityController } from './entity.controller';

export class StoreStockController extends EntityController {
  getStoreStockById = this.sendResponse({
    service: (req) => storeStockService.getStoreStockById(req.params.id),
    response: 'fetch product data full detail',
  });
}
