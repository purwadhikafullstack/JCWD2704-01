import prisma from '@/prisma';
import { Request } from 'express';

class ImageService {
  async render(req: Request) {
    const data = await prisma.image.findFirst({
      where: { name: req.params.name },
    });
    return data?.blob;
  }
}

export default new ImageService();
