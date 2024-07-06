import type { NextFunction, Request, Response } from 'express';
import userService from '@/service/user.service';
import { messageResponse } from '@/utils/message';

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.register(req);
      res
        .status(201)
        .send(messageResponse('Congratulations! Your Account has been successfully created.', 'Please check your email inbox for further access.'));
    } catch (error) {
      next(error);
    }
  }

  async verification(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.verification(req);
      res.status(200).send(messageResponse('Successfully verified your account', 'Please login for further access'));
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { accessToken, refreshToken } = await userService.login(req);
    res.status(201).send({ accessToken, refreshToken, ...messageResponse('Successfully login', "let's explore our product") });
    try {
    } catch (error) {
      next(error);
    }
  }

  async authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = await userService.authorization(req);
      res.send({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = await userService.update(req);
      res.send({ accessToken, ...messageResponse('Successfully edit your profile') });
    } catch (error) {
      next(error);
    }
  }

  async forgetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.forgetPassword(req);
      res.send(messageResponse('Successfully change your password', 'Try to login now'));
    } catch (error) {
      next(error);
    }
  }

  async forgetPasswordVerification(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.forgetPasswordVerification(req);
      res.send(messageResponse('Check your email for reset your password'));
    } catch (error) {
      next(error);
    }
  }

  async deactice(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
