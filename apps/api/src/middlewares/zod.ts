import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export const zod = (schema:ZodSchema) => (req:Request,res:Response,next:NextFunction) =>{
    try {
        schema.parse(req.body)
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(400).json({
            message: 'Invalid request',
            errors: error.errors
          });
        } else {
          next(error);
        }
      }
}