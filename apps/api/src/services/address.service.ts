import prisma from '@/prisma';
import { AuthError } from '@/utils/error';
import { Request } from 'express';

class AddressService {
  async getUserAddresses(req: Request) {
    if (!req.user) throw new AuthError('not authorized');
    const { user_id } = req.params;
    if (req.user.role == 'customer') {
      if (user_id != req.user.id) throw new AuthError('cant access other user address');
    }
    return await prisma.address.findMany({ where: { user_id, type: 'personal' } });
  }
}

export default new AddressService();
