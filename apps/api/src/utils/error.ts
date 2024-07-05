export class CustomError extends Error {
  public statusCode: number = 500;
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.statusCode = 400;
  }
}

export class InvalidDataError extends CustomError {
  public statusCode: number;
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.statusCode = 422;
  }
}

export class PaymentError extends CustomError {
  public statusCode: number;
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.statusCode = 402;
  }
}

export class AuthError extends CustomError {
  public statusCode: number;
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.statusCode = 401;
  }
}

export class NotFoundError extends CustomError {
  public statusCode: number;
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.statusCode = 404;
  }
}

export class InternalServerError extends CustomError {
  public statusCode: number;
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.statusCode = 500;
  }
}

export function catchAllErrors(error: unknown) {
  if (error instanceof InternalServerError)
    throw new InternalServerError(error.message);
  if (error instanceof BadRequestError)
    throw new BadRequestError(error.message);
  if (error instanceof InvalidDataError)
    throw new InvalidDataError(error.message);
  if (error instanceof PaymentError) throw new PaymentError(error.message);
  if (error instanceof AuthError) throw new AuthError(error.message);
  if (error instanceof NotFoundError) throw new NotFoundError(error.message);
  if (error instanceof Error) throw new Error(error.message);
}
