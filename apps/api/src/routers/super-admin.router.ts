import { AdminAuthController } from '@/controllers/admin.auth.controller';
import { SuperAdminController } from '@/controllers/super-admin.controller';
import {
  validateStoreAdminDetails,
  validateStoreAdminAddress,
  validateStoreAdminUpdateDetails,
  validateStoreAdminUpdateAddress,
  verifyAdminPassword,
  isAdminExist,
  verifyAdminAccToken,
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
    this.router.post('/auth/v1', verifyAdminPassword, this.adminAuthController.adminLogin);
    this.router.get('/users/customers', verifyAdminAccToken, this.superAdminController.getAllCustomers);
    this.router.get('/users/store-admins', verifyAdminAccToken, this.superAdminController.getAllStoreAdmins);
    this.router.post(
      '/users/store-admins',
      verifyAdminAccToken,
      isAdminExist,
      validateStoreAdminDetails,
      validateStoreAdminAddress,
      this.superAdminController.createStoreAdmin,
    );
    this.router.patch(
      '/users/store-admins/:id',
      verifyAdminAccToken,
      validateStoreAdminUpdateDetails,
      validateStoreAdminUpdateAddress,
      this.superAdminController.updateStoreAdmin,
    );
    this.router.delete('/users/store-admins/:id', verifyAdminAccToken, this.superAdminController.deleteStoreAdmin);
    this.router.post('/stores', verifyAdminAccToken, this.superAdminController.createStore);
    this.router.patch('/stores/:id', verifyAdminAccToken, this.superAdminController.updateStore);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new SuperAdminRouter();
