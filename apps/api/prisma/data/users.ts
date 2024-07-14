import { Gender, Role, User } from '@prisma/client';

export const users: User[] = [
  {
    id: 'cly5vk76k00000dmg78mgfo4y',
    email: 'super@mail.com',
    password: '$2a$12$ONRX/7qOG1nqV8XU7WrLQ.PO11Htfo5Y0aKaWfaEJh.xGmlPGpPwm',
    reset_token: null,
    is_verified: true,
    role: Role.super_admin,
    full_name: 'Rama Naufal Alim',
    gender: Gender.male,
    dob: new Date('2007-01-01'),
    phone_no: '081728347589',
    store_id: null,
    is_banned: false,
    created_at: new Date(),
    updated_at: new Date(),
    avatar_id: null,
    voucher_id: null,
    referral_code: null,
    reference_code: null,
  },
  {
    id: 'cly5vx4zh00000cju1d1ig61c',
    email: 'store@mail.com',
    password: '$2a$12$I/3WZPa1bq3ETdiFOihsjeuZQlIzRYDUJrZHyJkq7nLUEhFHum1Bi',
    reset_token: null,
    is_verified: true,
    role: Role.store_admin,
    full_name: 'Be Liau',
    gender: Gender.male,
    dob: new Date('1990-02-01'),
    phone_no: '081728392394',
    store_id: null,
    is_banned: false,
    created_at: new Date(),
    updated_at: new Date(),
    avatar_id: null,
    voucher_id: null,
    referral_code: null,
    reference_code: null,
  },
  {
    id: 'cly5vyacc00010cju7mdgd60n',
    email: 'andrew@mail.com',
    password: '$2a$12$kRSKn8F2mQ4K/x.DolwzTOZxYKzdBJYvw31C0FqNCLFg/KBLqKvay',
    reset_token: null,
    is_verified: false,
    role: Role.customer,
    full_name: 'An Drew',
    gender: Gender.male,
    dob: new Date('1998-03-11'),
    phone_no: '0817283920948',
    store_id: null,
    is_banned: false,
    created_at: new Date(),
    updated_at: new Date(),
    avatar_id: null,
    voucher_id: null,
    referral_code: null,
    reference_code: null,
  },
  {
    id: 'cly5w0lzg00020cjugmwqa7zf',
    email: 'frangky@mail.com',
    password: '$2a$12$J0/YV0ZnTXyvj3Ql5J3koeCErpJWKifyZHuYA2idDUm8m9kC5DU32',
    reset_token: null,
    is_verified: true,
    role: Role.customer,
    full_name: 'Frangky Sihombing',
    gender: Gender.male,
    dob: new Date('2000-02-13'),
    phone_no: '081728392394',
    store_id: null,
    is_banned: false,
    created_at: new Date(),
    updated_at: new Date(),
    avatar_id: null,
    voucher_id: null,
    referral_code: 'AzaGE',
    reference_code: null,
  },
];
