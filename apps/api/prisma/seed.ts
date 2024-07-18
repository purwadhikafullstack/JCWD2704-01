import { schedule } from './data/schedule';
import { copyCities } from './data/cities';
import { users } from './data/users';
import prisma from '@/prisma';
import { seedingCategory } from './data/category';

async function main() {
  try {
    await prisma.$transaction(
      async (prisma) => {
        await prisma.storeSchedule.createMany({ data: schedule });
        await prisma.user.createMany({ data: users });
        await seedingCategory();
        const cities = await copyCities();
        await prisma.city.createMany({
          data: cities.map(({ city_id, postal_code, province_id, type, ...city }) => ({
            ...city,
            type: 'Kota',
            city_id: Number(city_id),
            postal_code: Number(postal_code),
            province_id: Number(province_id),
          })),
        });
      },
      { timeout: 100000, maxWait: 100000 },
    );
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    console.error(error);
  }
}

main();
