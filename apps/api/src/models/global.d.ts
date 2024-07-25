import { Address, User } from '@prisma/client';
import { TUser } from './user.model';
import { TAddress } from './address.model';

export type UserType = Omit<User & { address?: Address | null }, 'password'>;

declare global {
  namespace Express {
    interface Request {
      user: UserType | null;
      store_admin: TUser | null;
      store_admin_address: TAddress | null;
    }
  }
}
