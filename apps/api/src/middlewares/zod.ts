import { BadRequestError } from '@/utils/error';
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';

export const zod =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
    } catch (error) {
      if (error instanceof ZodError) {
        next(new BadRequestError('Invalid Parameter'));
      }
      next(error);
    }
  };
