import { AdminAuthController } from '@/controllers/admin.auth.controller';
import { SuperAdminController } from '@/controllers/super-admin.controller';
import {
  checkIsAdmin,
  validateStoreAdminDetails,
  validateStoreAdminAddress,
  validateStoreAdminUpdateDetails,
  validateStoreAdminUpdateAddress,
} from '@/middlewares/admin.middleware';
import { Router } from 'express';

export class SuperAdminRouter {
  private router: Router;
  private adminAuthController: AdminAuthController;
  private superAdminController: SuperAdminController;
  constructor() {
    this.adminAuthController = new AdminAuthController();
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
      '/auth/v1',
      checkIsAdmin,
      this.adminAuthController.adminLogin,
    );
    this.router.post(
      '/users/store-admins',
      validateStoreAdminDetails,
      validateStoreAdminAddress,
      this.superAdminController.createStoreAdmin,
    );
    this.router.patch(
      '/users/store-admins/:id',
      validateStoreAdminUpdateDetails,
      validateStoreAdminUpdateAddress,
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
