export class BadRequestError extends Error {
  public statusCode: number;
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.statusCode = 400;
  }
}

export class NotFoundError extends Error {
  public statusCode: number;
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.statusCode = 404;
  }
}

export class InternalServerError extends Error {
  public statusCode: number;
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.statusCode = 500;
  }
}
