import { verify } from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';

import { ACC_SECRET_KEY, REFR_SECRET_KEY } from '@/config';
import type { UserType } from '@/models/global';

class UserMiddleware {
  async accessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '') || 'bearer kosong';
      req.user = verify(token, ACC_SECRET_KEY) as UserType;
      next();
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '') || '';
      req.user = verify(token, REFR_SECRET_KEY) as UserType;
      next();
    } catch (error) {
      next(error);
    }
  }

  async forgetPasswordToken(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default new UserMiddleware();
