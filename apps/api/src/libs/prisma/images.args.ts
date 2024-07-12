import { generateSlug } from '@/utils/generate';
import { ImageType, Prisma } from '@prisma/client';
import { Request } from 'express';
import sharp from 'sharp';

export async function imageCreate(
  req: Request,
  id: string,
  mimetype: 'png' | 'jpeg' | 'webp' | 'gif',
  type: ImageType,
): Promise<Prisma.ImageCreateInput> {
  const file = req.file as Express.Multer.File;
  return {
    name: `${generateSlug(file.fieldname)}-${id}`,
    blob: await sharp(file.buffer)[`${mimetype}`]().toBuffer(),
    type,
  };
}
