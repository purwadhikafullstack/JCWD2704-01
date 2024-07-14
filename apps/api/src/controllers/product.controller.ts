import productsService from '@/services/products.service';
import { NextFunction, Request, Response } from 'express';

export class ProductsController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await productsService.getProducts(req);
      res.send({ message: 'Fetched all products', data });
    } catch (error) {
      next(error);
    }
  }
  async getProductsWithVariants(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await productsService.getProductsWithVariants(req);
      res.send({ message: 'Fetched all products with variants', data });
    } catch (error) {
      next(error);
    }
  }
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await productsService.createProduct(req);
      res.status(201).send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
  async createVariant(req: Request, res: Response, next: NextFunction) {
    try {
      await productsService.createVariant(req);
      res.status(201).send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await productsService.updateProduct(req);
      res.send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
  async updateVariant(req: Request, res: Response, next: NextFunction) {
    try {
      await productsService.updateVariant(req);
      res.send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await productsService.deleteProduct(req);
      res.send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
  async deleteVariant(req: Request, res: Response, next: NextFunction) {
    try {
      await productsService.deleteVariant(req);
      res.send({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
}
