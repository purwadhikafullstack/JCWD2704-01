import { schedule } from './data/schedule';
import { copyCities } from './data/cities';
import { users } from './data/users';
import prisma from '@/prisma';

type City = {
  city_id: number;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: number;
};

async function main() {
  try {
    await prisma.$transaction(
      async (prisma) => {
        await prisma.storeSchedule.createMany({ data: schedule });
        // await prisma.user.createMany({ data: users });
        const cities = await copyCities();
        await prisma.city.createMany({
          data: cities.map(({ city_id, province_id, postal_code, ...city }: any) => ({
            ...city,
            city_id: Number(city_id),
            province_id: Number(province_id),
            postal_code: Number(postal_code),
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

// main();
