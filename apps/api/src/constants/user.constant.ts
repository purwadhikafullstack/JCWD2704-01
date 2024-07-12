import { hashPassword } from '@/libs/bcrypt';
import { formatNewDate } from '@/libs/date-fns';
import { User } from '@/schemas/user.schema';
import { generateReferral } from '@/utils/generate';
import { $Enums, Prisma } from '@prisma/client';

type TUserCreateVoucher = {
  title?: string;
  description?: string;
  type?: $Enums.PromoType;
  amount?: number;
  min_transaction?: number;
};

const userCreateInput = async ({
  email,
  password,
  full_name,
  gender,
  address,
  city_id,
  phone_no,
  dob,
  address_detail,
}: User['Register']): Promise<Prisma.UserCreateInput> => {
  return {
    email,
    full_name,
    phone_no: phone_no ? phone_no : null,
    gender,
    dob: dob ? dob : null,
    password: await hashPassword(password),
    referral_code: generateReferral(),
    addresses: { create: { city_id, address, details: address_detail } },
  };
};

const userUpdateInput = async ({ email, full_name, password, dob, phone_no }: User['Update']): Promise<Prisma.UserUpdateInput> => {
  return {
    ...(email && { email }),
    ...(full_name && { full_name }),
    ...(password && { password: await hashPassword(password) }),
    ...(phone_no && { phone_no }),
    ...(dob && { dob: new Date(dob) }),
  };
};

const userCreateVoucherInput = (payload?: TUserCreateVoucher): Prisma.PromotionCreateInput => {
  return {
    title: 'Discount Sale' || payload?.title,
    description: '20% of your first purchase' || payload?.description,
    type: 'voucher' || payload?.type,
    amount: 20 || payload?.amount,
    min_transaction: 20000 || payload?.min_transaction,
    is_valid: true,
    expiry_date: formatNewDate(1),
  };
};

export { userCreateInput, userCreateVoucherInput, userUpdateInput };
