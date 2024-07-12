import prisma from '@/prisma';
import { readFileSync } from 'fs';
import path from 'path';

const category: { name: string }[] = [
  { name: 'vegetable' },
  { name: 'fruit' },
  { name: 'fast food' },
  { name: 'basic necessities' },
  { name: 'Kitchen spices' },
  { name: 'milk&processed' },
];

export const seedingCategory = async () => {
  return await Promise.all(
    category.map(async ({ name }, i) => {
      const id = `/image/${name}.webp`;
      const blob = readFileSync(path.join(__dirname + id));
      await prisma.category.create({
        data: {
          name,
          image: { create: { blob, id } },
        },
      });
    }),
  );
};
