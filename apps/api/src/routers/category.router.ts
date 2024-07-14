import { CategoryController } from '@/controllers/category.controller';
import { blobUploader } from '@/libs/multer';
import { verifyAdminAccToken } from '@/middlewares/admin.middleware';
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
    this.router.get('/', verifyAdminAccToken, this.categoryController.getCategories);
    this.router.post('/', verifyAdminAccToken, blobUploader().single('cat_image'), this.categoryController.createCategory);
    this.router.post('/sub-categories', verifyAdminAccToken, this.categoryController.createSubCategory);
    this.router.patch('/sub-categories/:id', verifyAdminAccToken, this.categoryController.updateSubCategory);
    this.router.delete('/sub-categories/:id', verifyAdminAccToken, this.categoryController.deleteSubCategory);
    this.router.patch('/:id', verifyAdminAccToken, blobUploader().single('cat_image'), this.categoryController.updateCategory);
    this.router.delete('/:id', verifyAdminAccToken, this.categoryController.deleteCategory);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new CategoryRouter();
