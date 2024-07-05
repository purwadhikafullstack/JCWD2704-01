import { hashPassword } from '@/libs/bcrypt';
import { formatNewDate } from '@/libs/date-fns';
import { generateReferral } from '@/utils/generate';
import { $Enums, Prisma } from '@prisma/client';

type TUserCreate = {
  email: string;
  full_name: string;
  phone_no?: string | null;
  gender: $Enums.Gender;
  dob?: string | null;
  password: string;
  city_id: string;
  address: string;
  address_detail?: string | null;
  latitude: string;
  longitude: string;
};

type TUserCreateVoucher = {
  title?: string;
  description?: string;
  type?: $Enums.PromoType;
  amount?: number;
  min_transaction?: number;
};

type TUserUpdate = {
  email?: string;
  full_name?: string;
  password?: string;
  dob?: string | null;
};

export const userCreateInput = async ({
  email,
  full_name,
  address,
  city_id,
  dob,
  gender,
  password,
  phone_no,
  address_detail,
  latitude,
  longitude,
}: TUserCreate): Promise<Prisma.UserCreateInput> => {
  return {
    email,
    full_name,
    phone_no: phone_no ? phone_no : null,
    gender,
    dob: dob ? new Date(dob) : null,
    password: await hashPassword(password),
    referral_code: generateReferral(),
    addresses: {
      create: { city_id: Number(city_id), address, details: address_detail, latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
    },
  };
};

export const userCreateVoucherInput = (payload?: TUserCreateVoucher): Prisma.PromotionCreateInput => {
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

export const userUpdateInput = async ({ email, full_name, password, dob }: TUserUpdate): Promise<Prisma.UserUpdateInput> => {
  return {
    ...(email && { email }),
    ...(full_name && { full_name }),
    ...(password && { password: await hashPassword(password) }),
    ...(dob && { dob: new Date(dob) }),
  };
};
