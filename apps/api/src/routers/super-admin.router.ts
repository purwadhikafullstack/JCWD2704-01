import { StoreAdminController } from '@/controllers/store-admin.controller';
import { SuperAdminController } from '@/controllers/super-admin.controller';
import {
  validateStoreAdminCreateInputs,
  validateStoreAdminUpdateInputs,
} from '@/middlewares/admin.middleware';
import { Router } from 'express';

export class SuperAdminRouter {
  private router: Router;
  private storeAdminController: StoreAdminController;
  private superAdminController: SuperAdminController;
  constructor() {
    this.storeAdminController = new StoreAdminController();
    this.superAdminController = new SuperAdminController();
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get(
      '/users/customers',
      this.superAdminController.getAllCustomers,
    );
    this.router.get(
      '/users/store-admins',
      this.superAdminController.getAllStoreAdmins,
    );
    this.router.post(
      '/users/store-admins',
      validateStoreAdminCreateInputs,
      this.superAdminController.createStoreAdmin,
    );
    this.router.patch(
      '/users/store-admins/:id',
      validateStoreAdminUpdateInputs,
      this.superAdminController.updateStoreAdmin,
    );
    this.router.delete(
      '/users/store-admins/:id',
      this.superAdminController.deleteStoreAdmin,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
