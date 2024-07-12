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
    // [X] Feature Register
    this.router.get('/city', userController.getCity); // Get City data
    this.router.post('/v1/:token', userController.verification); // Register Email verification
    this.router.post('/v1', blobUploader().single('avatar'), userController.register); // Register

    // [X] Feature Update
    this.router.patch('/v1', userMiddleware.accessToken, blobUploader().single('avatar'), userController.update); // Update

    // [X] Feature Login and Authoriztion User
    this.router.post('/v2',userController.login); // Login
    this.router.get('/v2', userMiddleware.refreshToken, userController.authorization); // Refresh and Access token

    // [X] Feature Forget Password User
    this.router.patch('/v3/:token', userController.forgetPassword); // Forget password
    this.router.post('/v3', userController.forgetPasswordVerification); // Forget Password Email verification

    // [ ] Feature Ban or Delete User
    this.router.delete('/', userController.deactice);
  }

  public getRouter() {
    return this.router;
  }
}

export default new UserRouter();
