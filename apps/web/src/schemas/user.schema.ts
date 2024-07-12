import { z } from "zod";

const email = z.string().email();
const password = z.string().min(6, { message: "Password requires at least 6 characters" });
const full_name = z.string().min(4, { message: "Full Name requires at least 4 characters" });
const dob = z.date().optional();
const phone_no = z
  .string()
  .min(10, { message: "Phone Number requires min 10 numbers" })
  .max(12, { message: "Phone Number requires max 12 numbers" })
  .optional();
const avatar = z
  .instanceof(File || undefined)
  .refine((file) => file?.size < 1024 * 1024)
  .refine((file) => file.type.startsWith("image/"))
  .optional();

export const registerSchema = z
  .object({
    avatar,
    email,
    password,
    confirmPassword: z.string(),
    full_name,
    gender: z.union([z.literal("male"), z.literal("female")], {
      message: "Gender requires at least pick one",
    }),
    address: z.string(),
    city_id: z.number(),
    phone_no,
    dob,
    referrence_code: z.string().optional(),
    address_detail: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password must be equal to your password",
    path: ["confirmPassword"],
  });

export type RegisterType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginType = z.infer<typeof loginSchema>;
