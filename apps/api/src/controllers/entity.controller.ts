import { NextFunction, Request, Response } from 'express';

interface IExtender<T> {
  req: Request;
  res: Response;
  next: NextFunction;
  data: T;
}

interface Page {
  now: number;
  end: number;
}

type TResponseOption<T> = {
  service: (req: Request) => Promise<T>;
  response?: string | ((extend: IExtender<T>) => void);
  status?: number;
  page?: Page;
};

export class EntityController {
  protected sendResponse<T = any>({ response = 'success', service, status = 200 }: TResponseOption<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = (await service(req)) as T & { page: Page; data: T };
        const page = result?.page;
        const data = result.page ? result.data : result;
        res.status(status);
        if (typeof response == 'string') res.send({ message: response, data, page });
        else response({ res, req, next, data });
      } catch (error) {
        next(error);
      }
    };
  }
}
