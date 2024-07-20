import { Prisma } from '@prisma/client';
import { Request } from 'express';

export function searchProducts(req: Request): Prisma.ProductWhereInput {
  const { search_tab1 } = req.query;
  return {
    OR: [
      { name: { contains: String(search_tab1) } },
      { category: { name: { contains: String(search_tab1) } } },
      { sub_category: { name: { contains: String(search_tab1) } } },
    ],
  };
}
