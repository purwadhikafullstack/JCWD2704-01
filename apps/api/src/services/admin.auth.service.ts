import { ACC_SECRET_KEY, REFR_SECRET_KEY } from '@/config';
import { createToken } from '@/libs/jwt';
import { TUser } from '@/models/user.model';
import prisma from '@/prisma';
import { catchAllErrors } from '@/utils/error';
import { adminOmit } from '@/utils/prisma/user.args';
import { Request } from 'express';

class AdminAuthService {
  async adminLogin(req: Request) {
    try {
      const accessToken = createToken(req?.user, ACC_SECRET_KEY, '1h');
      const refreshToken = createToken(
        { id: req?.user.id },
        REFR_SECRET_KEY,
        '10h',
      );
      return { accessToken, refreshToken };
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async validateAdminRefreshToken(req: Request) {
    try {
      const isUserExist: TUser = (await prisma.user.findFirst({
        where: { id: req?.user.id },
        omit: adminOmit,
      })) as TUser;
      const access_token = createToken(isUserExist, ACC_SECRET_KEY, '1h');
      return {
        accessToken: access_token,
        role: isUserExist?.role,
        isVerified: isUserExist?.is_verified,
      };
    } catch (error) {
      catchAllErrors(error);
    }
  }
}

export default new AdminAuthService();
