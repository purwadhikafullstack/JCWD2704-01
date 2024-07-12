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
  await prisma.$transaction(
    async (prisma) => {
      try {
        await prisma.storeSchedule.createMany({ data: schedule });
        await prisma.user.createMany({ data: users });
        const cities = await copyCities() as City[];
        await prisma.city.createMany({
          data: cities.map((city: City) => ({
            city_name:city.city_name,
            province:city.province,
            type:"Kota",
            city_id: city.city_id,
            postal_code: city.postal_code,
          })),
        });
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    },
    { maxWait: 50000, timeout: 50000 },
  );
}

main();
