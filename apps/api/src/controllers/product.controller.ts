import productsService from '@/services/products.service';
import { NextFunction, Request, Response } from 'express';

export class ProductsController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await productsService.getProducts(req);
      res.send({ message: 'Fetched all products', results });
    } catch (error) {
      next(error);
    }
  }
  async getProductIdsAndNames(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await productsService.getProductIdsAndNames(req);
      res.send({ message: 'Fetched all products ids and names.', results });
    } catch (error) {
      next(error);
    }
  }
  async getProductsWithVariants(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await productsService.getProductsWithVariants(req);
      res.send({ message: 'Fetched all products with variants', results });
    } catch (error) {
      next(error);
    }
  }
  async getVariantsNamesIds(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await productsService.getVariantNamesIds(req);
      res.send({ message: 'Fetched all variants names & ids.', results });
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
