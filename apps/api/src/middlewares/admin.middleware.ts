import { ACC_SECRET_KEY } from '@/config';
import { TUser } from '@/models/user.model';
import { AuthError, InvalidDataError, NotFoundError } from '@/utils/error';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export async function verifyAdminAccToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.header('Authorization')?.split(' ')[1] || '';
    if (!token) throw new AuthError('Unauthorized access');
    const verifiedAdmin = verify(token, ACC_SECRET_KEY);
    if (!verifiedAdmin) throw new AuthError('Unauthorized access');
    req.user = verifiedAdmin as TUser;
    next();
  } catch (error) {
    next(error);
  }
}
