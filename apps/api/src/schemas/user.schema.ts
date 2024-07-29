import { z } from 'zod';

const email = z.string().email();
const password = z.string().min(6, { message: 'Password requires at least 6 characters' });
const full_name = z.string().min(4, { message: 'Full Name requires at least 4 characters' });
const dob = z.coerce.date().optional();
const phone_no = z
  .string()
  .min(10, { message: 'Phone Number requires min 10 numbers' })
  .max(12, { message: 'Phone Number requires max 12 numbers' })
  .optional();

const userRegisterSchema = z.object({
  email,
  password,
  full_name,
  gender: z.union([z.literal('male'), z.literal('female')], {
    message: 'Gender requires at least pick one',
  }),
  phone_no,
  dob,
  referrence_code: z.string().optional(),
});

const userLoginSchema = z.object({
  email,
  password,
});

const userUpdateSchema = z.object({
  full_name: full_name.optional(),
  phone_no,
  dob,
});

const userUpdatePasswordSchema = z.object({
  password,
  newPassword: password
});

const userForgotSchema = z.object({
  password,
});

const userValidationEmailSchema = z.object({
  email,
});

export type User = {
  Register: z.infer<typeof userRegisterSchema>;
  Login: z.infer<typeof userLoginSchema>;
  Update: z.infer<typeof userUpdateSchema>;
  updatePassword: z.infer<typeof userUpdatePasswordSchema>;
  Forgot: z.infer<typeof userForgotSchema>;
  Validate: z.infer<typeof userValidationEmailSchema>;
};

export { userRegisterSchema, userLoginSchema, userUpdateSchema, userUpdatePasswordSchema, userForgotSchema, userValidationEmailSchema };
