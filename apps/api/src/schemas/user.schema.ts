import { optional, z } from 'zod';

const email = z.string().email();
const password = z.string().min(6, { message: 'Password requires at least 6 characters' });
const full_name = z.string().min(4, { message: 'Full Name requires at least 4 characters' });
const dob = z.string().datetime().optional();
const phone_no = z
  .string()
  .min(10, { message: 'Phone Number requires min 10 numbers' })
  .max(12, { message: 'Phone Number requires max 12 numbers' })
  .optional();

export const userRegisterSchema = z.object({
  email,
  password,
  full_name,
  gender: z.union([z.literal('male'), z.literal('female')], {
    message: 'Gender requires at least pick one',
  }),
  referrence_code: z.string().optional(),
  phone_no,
  dob,
  city_id: z.string().refine((val) => typeof Number(val) === 'number'),
  address: z.string(),
  address_detail: z.string().optional(),
  longitude: z.string().refine((val) => typeof parseFloat(val) === 'number'),
  latitude: z.string().refine((val) => typeof parseFloat(val) === 'number'),
});

export const userLoginSchema = z.object({
  email,
  password,
});

export const userUpdateSchema = z.object({
  email: email.optional(),
  password: password.optional(),
  full_name: full_name.optional(),
  phone_no,
  dob,
});

export const userForgotSchema = z.object({
  password,
});

export const userValidationEmailSchema = z.object({
  email,
});
