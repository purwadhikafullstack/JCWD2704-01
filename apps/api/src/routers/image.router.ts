import imageController from '@/controllers/image.controller';
import { Router } from 'express';

class ImageRouter {
  private router: Router;
  constructor() {
    this.router = Router();
    this.initializedRoutes();
  }

  private initializedRoutes() {
    this.router.get('/webp/:name', imageController.render);
  }

  public getRouter() {
    return this.router;
  }
}

export default new ImageRouter();
