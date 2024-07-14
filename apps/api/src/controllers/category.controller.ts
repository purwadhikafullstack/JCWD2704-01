import categoryService from '@/services/category.service';
import { NextFunction, Request, Response } from 'express';

export class CategoryController {
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await categoryService.getCategories(req);
      res.send({ message: 'Fetched all categories.', data });
    } catch (error) {
      next(error);
    }
  }
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      await categoryService.createCategory(req);
      res.status(201).send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      await categoryService.updateCategory(req);
      res.send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
  async createSubCategory(req: Request, res: Response, next: NextFunction) {
    try {
      await categoryService.createSubCategory(req);
      res.status(201).send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
  async updateSubCategory(req: Request, res: Response, next: NextFunction) {
    try {
      await categoryService.updateSubCategory(req);
      res.send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      await categoryService.deleteCategory(req);
      res.send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
  async deleteSubCategory(req: Request, res: Response, next: NextFunction) {
    try {
      await categoryService.deleteSubCategory(req);
      res.send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
}
