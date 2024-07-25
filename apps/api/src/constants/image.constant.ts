import { generateSlug } from '@/utils/generate';
import { $Enums, Prisma, User } from '@prisma/client';
import { nanoid } from 'nanoid';
import sharp from 'sharp';

export const userDataImage = async (file: Express.Multer.File, type?: $Enums.ImageType, user?: User | null): Promise<Prisma.ImageCreateInput> => {
  const blob = await sharp(file.buffer).webp().toBuffer();
  const name = `${generateSlug(file.fieldname.trim())}-${nanoid()}`;
  return {
    id: nanoid(),
    blob,
    name,
    type,
    ...(user && { user: { connect: { id: user.id } } }),
  };
};
