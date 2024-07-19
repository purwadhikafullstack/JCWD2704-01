import storeService from '@/services/store.service';
import { EntityController } from './entity.controller';

export class StoreController extends EntityController {
  getNearestStore = this.sendResponse({
    service: storeService.getNearestStore,
    response: 'fetch nearest store',
  });

  getStoreList = this.sendResponse({
    service: storeService.getStoreList,
    response: 'fetch store list',
  });
}
export default new StoreController();
