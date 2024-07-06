import { NextFunction, Request, Response } from 'express';
import adminAuthService from '@/services/admin.auth.service';

export class AdminAuthController {
  async adminLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken, refreshToken } = (await adminAuthService.adminLogin(
        req,
      )) as {
        accessToken: string;
        refreshToken: string;
      };
      res
        .cookie('access_token', accessToken, {
          sameSite: 'none',
        })
        .cookie('refresh_token', refreshToken)
        .send({ message: 'login success' });
    } catch (error) {
      next(error);
    }
  }
}
