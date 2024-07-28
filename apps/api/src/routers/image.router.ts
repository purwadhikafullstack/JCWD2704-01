import imageController from '@/controllers/image.controller';
import { Router } from 'express';

export class ImageRouter {
  private router: Router;
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get('/:name', imageController.render);
  }
  getRouter(): Router {
    return this.router;
  }
}

export default new ImageRouter();
