import { schedule } from './data/schedule';
import { copyCities } from './data/cities';
import { users } from './data/users';
import prisma from '@/prisma';
import { seedingCategory } from './data/category';

async function main() {
  await prisma.$transaction(async (prisma) => {
    try {
      await prisma.storeSchedule.createMany({ data: schedule });
      await prisma.user.createMany({ data: users });
      const cities = await copyCities();
      // const category = await seedingCategory();
      await prisma.city.createMany({
        data: cities.map((city: any) => ({
          ...city,
          city_id: Number(city.city_id),
          province_id: /*Number(city.province_id)*/ undefined,
          postal_code: Number(city.postal_code),
        })),
      });
      await prisma.address.createMany({
        data: {
          address: '',
          city_id: 1,
          user_id: (await prisma.user.findFirst())?.id || '',
        },
      });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  });
}

main();
