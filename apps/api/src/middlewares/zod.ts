import { BadRequestError } from '@/utils/error';
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema, z } from 'zod';

export const zod =
  (schema: ZodSchema, target: 'body' | 'query' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req[target] = schema.parse(req[target]);
      next();
    } catch (error) {
      next(error);
    }
  };
