import { NextFunction, Request, Response } from 'express';

interface IExtender {
  req: Request;
  res: Response;
  next: NextFunction;
  data: any;
}

type TResponseOption<T> = {
  service: (req: Request) => Promise<T>;
  response?: string | ((extend: IExtender) => void);
  status?: number;
};

export class EntityController {
  protected sendResponse<T>({
    response = 'success',
    service,
    status = 200,
  }: TResponseOption<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await service(req);
        res.status(status);
        if (typeof response == 'string') res.send({ message: response, data });
        else response({ res, req, next, data });
      } catch (error) {
        next(error);
      }
    };
  }
}
