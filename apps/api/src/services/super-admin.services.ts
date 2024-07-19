import { TUser } from '@/models/user.model';
import prisma from '@/prisma';
import { catchAllErrors, NotFoundError } from '@/utils/error';
import { countTotalPage, paginate } from '@/utils/pagination';
import { userFindMany } from '@/libs/prisma/user.args';
import { Address, AddressType, Role, User } from '@prisma/client';
import { Request } from 'express';
import { addressSchema, addressUpdateSchema } from '@/libs/zod-schemas/store-admin.schema';
import { ZodError } from 'zod';
import { getLatLngFromAddress } from '@/utils/other-api/geocode';
import { reqBodyReducer } from '@/utils/req.body.helper';

class SuperAdminService {
  async getAllCustomers(req: Request) {
    try {
      const { page, show } = req.query;
      const queries = userFindMany(Role.customer, req);
      const users = (await prisma.user.findMany({
        ...queries,
        ...paginate(Number(show), Number(page)),
      })) as TUser[];
      if (!users) throw new NotFoundError('Customers not found.');
      const count = await prisma.user.count({ where: queries.where });
      return { users, totalPage: countTotalPage(count, Number(show)) };
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async getAllStoreAdmins(req: Request) {
    try {
      const { page, show } = req.query;
      const queries = userFindMany(Role.store_admin, req);
      const users = (await prisma.user.findMany({
        ...queries,
        ...paginate(Number(show), Number(page)),
      })) as TUser[];
      if (!users) throw new NotFoundError('Store Admin not found.');
      const count = await prisma.user.count({ where: queries.where });
      return { users, totalPage: countTotalPage(count, Number(show)) };
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async createStoreAdmin(req: Request) {
    try {
      await prisma.$transaction(async (prisma) => {
        const storeAdmin = await prisma.user.create({
          data: req.store_admin as User,
        });
        await prisma.address.create({
          data: {
            ...(req.store_admin_address as Address),
            user_id: storeAdmin.id,
            type: AddressType.personal,
          },
        });
      });
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async updateStoreAdmin(req: Request) {
    const { id } = req.params;
    try {
      await prisma.$transaction(async (prisma) => {
        const addressID = await prisma.user.update({
          where: { id, AND: { role: Role.store_admin } },
          data: req.store_admin as User,
          select: {
            addresses: {
              select: {
                id: true,
              },
            },
          },
        });
        await prisma.address.update({
          where: { id: addressID.addresses[0].id },
          data: req.store_admin_address as Address,
        });
      });
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async deleteStoreAdmin(req: Request) {
    try {
      const { id } = req.params;
      const isExist = await prisma.user.findFirst({
        where: { id },
      });
      if (!isExist) throw new NotFoundError("Store admin doesn't exist");
      await prisma.user.update({
        where: { id, AND: { role: Role.store_admin } },
        data: {
          is_banned: true,
        },
      });
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async createStore(req: Request) {
    try {
      const { address, city_id } = req.body;
      if (city_id) req.body.city_id = Number(city_id);
      const validateAddress = addressSchema.safeParse(req.body);
      if (!validateAddress.success) throw new ZodError(validateAddress.error.errors);
      const { location } = await getLatLngFromAddress(address);
      if (!location) throw new NotFoundError('Location not found.');
      await prisma.address.create({
        data: {
          ...(req.body as Address),
          longitude: location.lng,
          latitude: location.lat,
          user_id: req.user?.id,
          type: AddressType.store,
        },
      });
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async updateStore(req: Request) {
    try {
      console.log(req.params.id);

      const { address, city_id } = req.body;
      if (city_id) req.body.city_id = Number(city_id);
      const validateAddress = addressUpdateSchema.safeParse(req.body);
      if (!validateAddress.success) throw new ZodError(validateAddress.error.errors);
      if (address) {
        const { location } = await getLatLngFromAddress(address);
        if (!location) throw new NotFoundError('Location not found.');
        if (location) {
          req.body.longitude = location.lng;
          req.body.latitude = location.lat;
        }
      }
      await prisma.address.update({
        where: { id: req.params.id },
        data: {
          ...(reqBodyReducer(req.body) as Address),
        },
      });
    } catch (error) {
      catchAllErrors(error);
    }
  }
}

export default new SuperAdminService();
