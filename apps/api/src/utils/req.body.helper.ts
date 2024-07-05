import { Request } from 'express';

export function reqBodyReducer(req: Request) {
  const entries = Object.entries(req.body).reduce(
    (arr: any[], [key, value]) => {
      value && arr.push([key, value]);
      return arr;
    },
    [],
  );
  return Object.fromEntries(entries);
}
