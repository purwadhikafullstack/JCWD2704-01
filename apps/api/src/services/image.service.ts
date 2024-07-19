import prisma from '@/prisma';
import { Request } from 'express';

class ImageService {
  async render(req: Request) {
    const image = await prisma.image.findFirst({ where: { name: req.params.name }, select: { blob: true } });
    return image?.blob;
  }
}

export default new ImageService();
