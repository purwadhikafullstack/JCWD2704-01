import superAdminServices from '@/services/super-admin.services';
import { NextFunction, Request, Response } from 'express';

export class SuperAdminController {
  async getAllCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await superAdminServices.getAllCustomers(req);
      res.send({ message: 'Fetched all customers.', results });
    } catch (error) {
      next(error);
    }
  }
  async getAllStoreAdmins(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await superAdminServices.getAllStoreAdmins(req);
      res.send({ message: 'Fetched all store admins.', results });
    } catch (error) {
      next(error);
    }
  }
  async createStoreAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      await superAdminServices.createStoreAdmin(req);
      res.status(201).send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
  async updateStoreAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      await superAdminServices.updateStoreAdmin(req);
      res.send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
  async deleteStoreAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      await superAdminServices.deleteStoreAdmin(req);
      res.send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
  async createStore(req: Request, res: Response, next: NextFunction) {
    try {
      await superAdminServices.createStore(req);
      res.status(201).send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }

  async updateStore(req: Request, res: Response, next: NextFunction) {
    try {
      await superAdminServices.updateStore(req);
      res.send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
}
