import { z } from "zod";

export const fileErrorMessage = { message: "Image is required" };

export const createCategorySchema = z.object({
  name: z.string().min(4, { message: "Must contain minimum of 4 characters." }),
  cat_image: z
    .instanceof(File, fileErrorMessage)
    .refine((file) => file?.size < 1024 * 1024)
    .refine((file) => file.type.startsWith("image/")),
});

export const updateCategorySchema = z.object({
  name: z.string().min(4, { message: "Must contain minimum of 4 characters." }).optional(),
  cat_image: z
    .instanceof(File, fileErrorMessage)
    .refine((file) => file?.size < 1024 * 1024)
    .refine((file) => file.type.startsWith("image/"))
    .optional(),
});

export const createSubCatSchema = z.object({
  name: z.string().min(4, { message: "Must contain minimum of 4 characters." }),
  category_id: z.number().positive(),
});

export const updateSubCatSchema = z.object({
  name: z.string().min(4, { message: "Must contain minimum of 4 characters." }).optional(),
  category_id: z.number().positive().optional(),
});
