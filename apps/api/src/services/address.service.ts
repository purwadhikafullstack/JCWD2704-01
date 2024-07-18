import { Request } from 'express';
import { prisma } from '@/libs/prisma';
import { AuthError, BadRequestError } from '@/utils/error';

export class AddressService {
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
