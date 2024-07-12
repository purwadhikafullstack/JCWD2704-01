import prisma from '@/prisma';
import { catchAllErrors, InternalServerError } from '@/utils/error';
import { CityType } from '@prisma/client';
import { Request } from 'express';

class CitiesService {
  async getAllCities(req: Request) {
    try {
      const cities = await prisma.city.findMany({
        where: { type: CityType.Kota },
        orderBy: { city_name: 'asc' },
        omit: { created_at: true, updated_at: true },
      });
      if (!cities) throw new InternalServerError('Unable to fetch cities.');
      return cities;
    } catch (error) {
      catchAllErrors(error);
    }
  }
}

export default new CitiesService();
