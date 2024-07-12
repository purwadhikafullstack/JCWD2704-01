import { BadRequestError } from '@/utils/error';
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema, z } from 'zod';

export const zod =
  (schema: ZodSchema, target: 'body' | 'query' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req[target]);
      req[target] = schema.parse(req[target]);
      console.log(req[target]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // console.log(error.issues);
        next(new BadRequestError('Zod: Invalid Parameter'));
      }
      next(error);
    }
  };
