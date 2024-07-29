import imageService from '@/services/image.service';
import { Controller } from './index.types';

class ImageController {
  render: Controller = async (req, res, next) => {
    try {
      const blob = await imageService.render(req);
      res.status(200).set('Content-type', 'image/webp').send(blob);
    } catch (error) {
      next(error);
    }
  };
}

export default new ImageController();
