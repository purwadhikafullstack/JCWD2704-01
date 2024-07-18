import { ImageController } from '@/controllers/image.controller';
import { Router } from 'express';

export class ImageRouter {
  private router: Router;
  private imageController: ImageController;
  constructor() {
    this.imageController = new ImageController();
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get('/:name', this.imageController.render);
  }
  getRouter(): Router {
    return this.router;
  }
}

export default new ImageRouter();
