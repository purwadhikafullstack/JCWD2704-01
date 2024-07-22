import { TAddress } from './address.model';
import { TStoreAdmin, TUser } from './user.model';

declare global {
  namespace Express {
    interface Request {
      user: TUser;
      store_admin: TUser;
      store_admin_address: TAddress;
    }
  }
}
