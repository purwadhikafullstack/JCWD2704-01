import userController from '@/controllers/user.controller';
import { blobUploader } from '@/libs/multer';
import userMiddleware from '@/middlewares/user.middleware';
import { Router } from 'express';

class UserRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializedRoutes();
  }

  private initializedRoutes() {
    // [x] Feature Register and Update User
    this.router.post('/v1/:token', userController.verification); // Register Email verification
    this.router.post('/v1', blobUploader().single('avatar'), userController.register); // Register
    this.router.patch('/v1', userMiddleware.accessToken, blobUploader().single('avatar'), userController.update); // Update

    // [x] Feature Forget Password User
    this.router.post('/v2/:token', userController.forgetPasswordVerification); // Forget Password Email verification
    this.router.patch('/v2', userController.forgetPassword); // Forget password

    // [x] Feature Login and Authoriztion User
    this.router.post('/v2', userController.login); // Login
    this.router.get('/v2', userMiddleware.refreshToken, userController.authorization); // Refresh and Access token

    // [] Feature Ban or Delete User
    this.router.delete('/', userController.deactice);
  }

  public getRouter() {
    return this.router;
  }
}

export default new UserRouter();
