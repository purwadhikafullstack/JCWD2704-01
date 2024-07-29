import { CategoryController } from '@/controllers/category.controller';
import { blobUploader } from '@/libs/multer';
import { authorizeStoreAdmin, authorizeSuperAdmin, verifyAdminAccToken } from '@/middlewares/admin.middleware';
import { Router } from 'express';

export class CategoryRouter {
  private router: Router;
  private categoryController: CategoryController;
  constructor() {
    this.categoryController = new CategoryController();
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get('/', this.categoryController.getCategories);
    this.router.get('/names', verifyAdminAccToken, authorizeStoreAdmin, this.categoryController.getCategoryNames);
    this.router.post('/', verifyAdminAccToken, authorizeSuperAdmin, blobUploader().single('cat_image'), this.categoryController.createCategory);
    this.router.get('/sub-categories', verifyAdminAccToken, authorizeStoreAdmin, this.categoryController.getSubCategories);
    this.router.post('/sub-categories', verifyAdminAccToken, authorizeSuperAdmin, this.categoryController.createSubCategory);
    this.router.patch('/sub-categories/:id', verifyAdminAccToken, authorizeSuperAdmin, this.categoryController.updateSubCategory);
    this.router.delete('/sub-categories/:id', verifyAdminAccToken, authorizeSuperAdmin, this.categoryController.deleteSubCategory);
    this.router.get('/sub-categories/names', this.categoryController.getSubCategoriesByCatID);
    this.router.patch('/:id', verifyAdminAccToken, authorizeSuperAdmin, blobUploader().single('cat_image'), this.categoryController.updateCategory);
    this.router.delete('/:id', verifyAdminAccToken, authorizeSuperAdmin, this.categoryController.deleteCategory);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new CategoryRouter();
