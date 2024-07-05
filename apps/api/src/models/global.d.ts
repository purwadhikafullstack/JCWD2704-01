import { TStoreAdmin, TUser } from './user.model';

declare global {
  namespace Express {
    interface Request {
      user: TUser;
      store_admin: TUser;
    }
  }
}
