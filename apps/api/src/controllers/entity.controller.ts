import { NextFunction, Request, Response } from 'express';

interface IExtender {
  req: Request;
  res: Response;
  next: NextFunction;
  data: any;
}

interface Page {
  now: number;
  end: number;
}

type TResponseOption<T> = {
  service: (req: Request) => Promise<T>;
  response?: string | ((extend: IExtender) => void);
  status?: number;
  page?: Page;
};

export class EntityController {
  protected sendResponse<T>({ response = 'success', service, status = 200 }: TResponseOption<T>) {
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
