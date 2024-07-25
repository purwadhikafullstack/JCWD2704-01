import { hashPassword } from '@/libs/bcrypt';
import { formatNewDate } from '@/libs/date-fns';
import { User } from '@/schemas/user.schema';
import { generateReferral } from '@/utils/generate';
import { $Enums, Prisma, User as UserType } from '@prisma/client';
import { nanoid } from 'nanoid';

type TUserCreateVoucher = {
  title?: string;
  description?: string;
  type?: $Enums.PromoType;
  amount?: number;
  min_transaction?: number;
};

type UserAccess = { unique: (email: string) => Prisma.UserFindUniqueArgs; first: (id: string) => Prisma.UserFindFirstArgs };

const include: Prisma.UserInclude = { avatar: { select: { name: true } }, addresses: { include: { city: true } }, promotion: true, cart: true };

const userCreateInput = async ({ email, password, full_name, gender, phone_no, dob }: User['Register']): Promise<Prisma.UserCreateInput> => {
  return {
    id: nanoid(),
    email,
    full_name,
    phone_no: phone_no ? phone_no : null,
    gender,
    dob: dob ? dob : null,
    password: await hashPassword(password),
    referral_code: generateReferral().toUpperCase(),
  };
};

const userUpdateArgs = ({ id, validate }: { id: string; validate: User['Update'] }): Prisma.UserUpdateArgs => {
  const { dob, full_name, phone_no } = validate;
  return {
    where: { id },
    data: {
      ...(full_name && { full_name }),
      ...(phone_no && { phone_no }),
      ...(dob && { dob: new Date(dob) }),
    },
    include,
  };
};

const userCreateVoucherInput = (user: UserType, payload?: TUserCreateVoucher): Prisma.PromotionCreateInput => {
  return {
    id: nanoid(),
    title: 'Discount Sale' || payload?.title,
    description: '20% of your first purchase' || payload?.description,
    type: 'referral_voucher' || payload?.type,
    amount: 20 || payload?.amount,
    min_transaction: 20000 || payload?.min_transaction,
    is_valid: true,
    expiry_date: formatNewDate(1),
    user: { connect: { id: user.id } },
  };
};

const userAccessArgs: UserAccess = {
  unique: (email) => ({
    where: { email },
    include,
  }),
  first: (id) => ({
    where: { id },
    include,
  }),
};

// type UserType = {
//   first: Prisma.UserGetPayload<ReturnType<typeof userAccessArgs.first>> | null;
//   unique: Prisma.UserGetPayload<ReturnType<typeof userAccessArgs.unique>> | null;
// };

export { userCreateInput, userCreateVoucherInput, userUpdateArgs, userAccessArgs };
