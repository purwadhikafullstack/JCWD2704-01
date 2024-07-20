import { ProductsController } from '@/controllers/product.controller';
import { blobUploader } from '@/libs/multer';
import { authorizeStoreAdmin, authorizeSuperAdmin, verifyAdminAccToken } from '@/middlewares/admin.middleware';
import { Router } from 'express';

class ProductRouter {
  private router: Router;
  private productController: ProductsController;
  constructor() {
    this.productController = new ProductsController();
    this.router = Router();
    this.initializedRoutes();
  }
  private initializedRoutes(): void {
    this.router.get('/', this.productController.getProducts);
    this.router.post('/', verifyAdminAccToken, authorizeSuperAdmin, this.productController.createProduct);
    this.router.get('/names-ids', verifyAdminAccToken, authorizeStoreAdmin, this.productController.getProductIdsAndNames);
    this.router.get('/variants', this.productController.getProductsWithVariants);
    this.router.post(
      '/variants',
      verifyAdminAccToken,
      authorizeSuperAdmin,
      blobUploader().single('variant_image'),
      this.productController.createVariant,
    );
    this.router.patch(
      '/variants/:id',
      verifyAdminAccToken,
      authorizeSuperAdmin,
      blobUploader().single('variant_image'),
      this.productController.updateVariant,
    );
    this.router.delete('/variants/:id', verifyAdminAccToken, authorizeSuperAdmin, this.productController.deleteVariant);
    this.router.patch('/:id', verifyAdminAccToken, authorizeSuperAdmin, this.productController.updateProduct);
    this.router.delete('/:id', verifyAdminAccToken, authorizeSuperAdmin, this.productController.deleteProduct);
  }
  getRouter(): Router {
    return this.router;
  }
}

export default new ProductRouter();
