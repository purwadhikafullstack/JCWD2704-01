import imageService from '@/services/image.service';
import { NextFunction, Request, Response } from 'express';

export class ImageController {
  async render(req: Request, res: Response, next: NextFunction) {
    try {
      const blob = await imageService.render(req);
      res.set('Content-type', 'image/png');
      res.send(blob);
    } catch (error) {
      next(error);
    }
  }
}
