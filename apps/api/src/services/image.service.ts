import prisma from '@/prisma';
import { Request } from 'express';

class ImageService {
  async render(req: Request) {
    const { name } = req.params;
    const image = await prisma.image.findFirst({ where: { name }, select: { blob: true } });
    if (image) return image.blob;
    return;
  }
}

export default new ImageService()