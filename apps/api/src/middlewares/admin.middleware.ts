import { hashPassword } from '@/libs/bcrypt';
import {
  storeAdminSchema,
  storeAdminUpdateSchema,
} from '@/libs/schemas/store-admin.schema';
import { TUser } from '@/models/user.model';
import { AuthError } from '@/utils/error';
import { reqBodyReducer } from '@/utils/req.body.helper';
import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export async function authorizeSuperAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (req.user.role !== Role.super_admin)
      throw new AuthError('Unauthorized access to super admin privileges.');
    next();
  } catch (error) {
    next(error);
  }
}

export async function validateStoreAdminCreateInputs(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validate = storeAdminSchema.safeParse(req.body);
    if (!validate.success) throw new ZodError(validate.error.errors);
    validate.data.password = await hashPassword(validate.data.password);
    req.store_admin = {
      ...validate.data,
      dob: new Date(validate.data.dob),
      role: Role.store_admin,
      is_verified: true,
      store_id: !validate.data.store_id ? null : validate.data.store_id,
    } as TUser;
    next();
  } catch (error) {
    next(error);
  }
}

export async function validateStoreAdminUpdateInputs(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (req.body.password)
      req.body.password = await hashPassword(req.body.password);
    if (req.body.dob) req.body.dob = new Date(req.body.dob);
    const data = reqBodyReducer(req.body);
    const validate = storeAdminUpdateSchema.safeParse(data);
    if (!validate.success) throw new ZodError(validate.error.errors);
    req.store_admin = validate.data as TUser;
    next();
  } catch (error) {
    next(error);
  }
}
