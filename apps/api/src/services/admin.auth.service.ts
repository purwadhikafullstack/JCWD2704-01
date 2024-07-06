import { ACC_SECRET_KEY, REFR_SECRET_KEY } from '@/config';
import { createToken } from '@/libs/jwt';
import { catchAllErrors } from '@/utils/error';
import { Request } from 'express';

class AdminAuthService {
  async adminLogin(req: Request) {
    try {
      console.log(req?.user);
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
}

export default new AdminAuthService();
