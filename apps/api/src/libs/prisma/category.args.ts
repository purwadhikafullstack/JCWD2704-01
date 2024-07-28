import { Prisma } from '@prisma/client';
import { Request } from 'express';

export function categoryCreate(req: Request, image_id: string): Prisma.CategoryCreateArgs {
  const { body } = req;
  return {
    data: {
      ...body,
      image: {
        connect: {
          id: image_id,
        },
      },
    },
  };
}
export function categoryUpdate(req: Request): Prisma.CategoryUpdateArgs {
  return {
    where: {
      id: Number(req.params.id),
    },
    data: { ...req.body },
    select: { image_id: true },
  };
}
