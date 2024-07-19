import { Prisma } from '@prisma/client';

export const categories: Prisma.CategoryCreateManyInput[] = [
  { id: 1, name: 'Sayur', created_at: new Date() },
  { id: 2, name: 'Buah', created_at: new Date() },
  { id: 3, name: 'Protein', created_at: new Date() },
  { id: 4, name: 'Sayur', created_at: new Date() },
  { id: 5, name: 'Sembako', created_at: new Date() },
  { id: 6, name: 'Siap Saji', created_at: new Date() },
  {
    id: 7,
    name: 'Susu & Olahan',
  },
];
