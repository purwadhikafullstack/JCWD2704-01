import { dateOpt, stringOpt } from '@/utils/optionals.type';
import { Gender, Role } from '@prisma/client';

export type TUser = {
  id?: string;
  email: string;
  password?: stringOpt;
  avatar_id?: stringOpt;
  reset_token?: stringOpt;
  referral_code?: stringOpt;
  reference_code?: stringOpt;
  is_verified: boolean;
  role: Role;
  store_id?: stringOpt;
  full_name?: stringOpt;
  gender?: Gender;
  dob?: dateOpt;
  phone_no?: stringOpt;
  voucher_id?: stringOpt;
  created_at?: dateOpt;
  updated_at?: dateOpt;
};
