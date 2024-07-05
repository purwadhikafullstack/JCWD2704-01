export class CustomError extends Error {
  public statusCode: number = 500;
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class BadRequestError extends CustomError {
  public statusCode: number;
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
  if (error instanceof CustomError) throw new CustomError(error.message);
  if (error instanceof Error) throw new Error(error.message);
}
