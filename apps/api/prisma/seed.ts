import { schedule } from './data/schedule';
import { copyCities } from './data/cities';
import { userDetails, users } from './data/users';
import prisma from '@/prisma';

async function main() {
  await prisma.$transaction(async (prisma) => {
    try {
      await prisma.storeSchedule.createMany({ data: schedule });
      await prisma.user.createMany({ data: users });
      await prisma.userDetail.createMany({ data: userDetails });
      const cities = await copyCities();
      await prisma.city.createMany({
        data: cities.map((city: any) => ({
          ...city,
          city_id: Number(city.city_id),
          province_id: Number(city.province_id),
          postal_code: Number(city.postal_code),
        })),
      });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  });
}

main();
