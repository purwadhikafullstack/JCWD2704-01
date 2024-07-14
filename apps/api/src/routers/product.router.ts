import { ProductsController } from '@/controllers/product.controller';
import { blobUploader } from '@/libs/multer';
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
    this.router.post('/', this.productController.createProduct);
    this.router.get('/variants', this.productController.getProductsWithVariants);
    this.router.post('/variants', blobUploader().single('variant_image'), this.productController.createVariant);
    this.router.patch('/variants/:id', blobUploader().single('variant_image'), this.productController.updateVariant);
    this.router.delete('/variants/:id', this.productController.deleteProduct);
    this.router.patch('/:id', this.productController.updateProduct);
    this.router.delete('/:id', this.productController.deleteProduct);
  }
  getRouter(): Router {
    return this.router;
  }
}

export default new ProductRouter();
