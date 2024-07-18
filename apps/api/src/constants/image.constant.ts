import { generateSlug } from '@/utils/generate';
import { Prisma } from '@prisma/client';
import sharp from 'sharp';

export const imageCreateInput = async (file: Express.Multer.File, id: string): Promise<Prisma.ImageCreateInput> => {
  const blob = await sharp(file.buffer).webp().toBuffer();
  const name = `${generateSlug(file.fieldname)}-${id}`;
  return {
    name,
    blob,
    type: 'avatar',
  };
};
