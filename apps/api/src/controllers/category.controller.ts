import categoryService from '@/services/category.service';
import { NextFunction, Request, Response } from 'express';
import { Controller } from './index.types';
import { messageResponse } from '@/utils/message';

export class CategoryController {
  getCat: Controller = async (req, res, next) => {
    try {
      const categories = await categoryService.getCat(req);
      res.send({ categories, ...messageResponse('Get categories ajah') });
    } catch (error) {
      next(error);
    }
  };

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await categoryService.getCategories(req);
      res.send({ message: 'Fetched all categories', results });
    } catch (error) {
      next(error);
    }
  }
  async getSubCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await categoryService.getSubCategories(req);
      res.send({ message: 'Fetched all sub-categories', results });
    } catch (error) {
      next(error);
    }
  }
  async getSubCategoriesByCatID(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await categoryService.getSubCategoriesByCatID(req);
      res.send({ message: 'Fetched sub-category by category ID', results });
    } catch (error) {
      next(error);
    }
  }
  async getCategoryNames(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await categoryService.getCategoryNames(req);
      res.send({ message: 'Fetched all category names', results });
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
