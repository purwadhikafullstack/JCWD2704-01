import { User } from '@prisma/client';
import { TEvent } from './event.model';
import { TUser } from './user.model';

export type UserType = Omit<User, 'password'>;

declare global {
  namespace Express {
    interface Request {
      user: UserType | null;
    }
  }
}
