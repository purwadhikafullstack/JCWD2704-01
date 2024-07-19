import { generateSlug } from '@/utils/generate';
import { ImageType, Prisma } from '@prisma/client';
import { Request } from 'express';
import { nanoid } from 'nanoid';
import sharp from 'sharp';

export async function imageCreate(req: Request, type: ImageType): Promise<Prisma.ImageCreateArgs> {
  const file = req.file as Express.Multer.File;
  const mimetype = file.mimetype.split('/')[1] as 'png' | 'jpeg' | 'gif' | 'webp';
  return {
    data: {
      name: `${generateSlug(file.fieldname)}-${nanoid()}`,
      blob: await sharp(file.buffer)[`${mimetype}`]().toBuffer(),
      type,
    },
  };
}

export async function imageUpdate(req: Request, id: string): Promise<Prisma.ImageUpdateArgs> {
  const file = req.file as Express.Multer.File;
  const mimetype = file.mimetype.split('/')[1] as 'png' | 'jpeg' | 'gif' | 'webp';
  return {
    where: { id },
    data: {
      blob: await sharp(file.buffer)[`${mimetype}`]().toBuffer(),
    },
  };
}
