import { Gender } from '@prisma/client';
import { z } from 'zod';

export const storeAdminSchema = z.object({
  email: z
    .string()
    .min(10, { message: 'Email must have min. 10 characters.' })
    .trim()
    .toLowerCase()
    .email({ message: 'Invalid email type.' }),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Password must have min. 8 characters' })
    .regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])'), {
      message: 'Password must have min. 1 uppercase.',
    }),
  store_id: z.string().optional(),
  full_name: z
    .string()
    .trim()
    .min(3, { message: 'Full name must have min. 3 characters.' }),
  gender: z.enum([Gender.male, Gender.female]),
  dob: z.string(),
  phone_no: z
    .string()
    .trim()
    .regex(new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'), {
      message: 'Invalid phone number format.',
    }),
});

export const storeAdminAddressSchema = z.object({
  address: z.string().trim(),
  city_id: z.number().positive().int(),
  details: z.string().trim().optional(),
});

export const storeAdminUpdateSchema = z.object({
  email: z
    .string()
    .min(10, { message: 'Email must have min. 10 characters.' })
    .trim()
    .toLowerCase()
    .email({ message: 'Invalid email type.' })
    .optional(),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Password must have min. 8 characters' })
    .regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])'), {
      message: 'Password must have min. 1 uppercase.',
    })
    .optional(),
  store_id: z.string().optional(),
  full_name: z
    .string()
    .trim()
    .min(3, { message: 'Full name must have min. 3 characters.' })
    .optional(),
  gender: z.enum([Gender.male, Gender.female]).optional(),
  dob: z.date({ message: 'Invalid date format.' }).optional(),
  phone_no: z
    .string()
    .trim()
    .regex(new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'), {
      message: 'Invalid phone number format.',
    })
    .optional(),
});

export const storeAdminAddressUpdateSchema = z.object({
  address: z.string().trim().optional(),
  city_id: z.number().positive().int().optional(),
  details: z.string().trim().optional(),
});
