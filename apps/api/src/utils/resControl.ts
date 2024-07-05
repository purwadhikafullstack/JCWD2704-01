import { NextFunction, Request, Response } from 'express';

interface IExtender {
  req: Request;
  res: Response;
  next: NextFunction;
  data: any;
}

interface IRunServiceOption<T> {
  service: (req: Request) => Promise<T>; // Changed to Promise<T>
  extend?: (extend: IExtender) => void;
  msg?: string;
  status?: number;
}

export const resControl =
  <T>({
    msg = 'success',
    service,
    status = 200,
    extend = () => {},
  }: IRunServiceOption<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await service(req);
      extend({ res, req, next, data });

      res.status(status).send({ message: msg, data });
    } catch (error) {
      next(error);
    }
  };
