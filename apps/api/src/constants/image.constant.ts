import { generateSlug } from '@/utils/generate';
import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import sharp from 'sharp';

export const imageCreateInput = async (file: Express.Multer.File): Promise<Prisma.ImageCreateInput> => {
  const blob = await sharp(file.buffer).webp().toBuffer();
  const name = `${generateSlug(file.fieldname)}-${nanoid()}`;
  return {
    name,
    blob,
    type: 'avatar',
  };
};
