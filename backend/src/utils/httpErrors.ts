export class HttpError extends Error {
  public statusCode: number;
  public code?: string | undefined;

  constructor(statusCode: number, message: string, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = "HttpError";
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = "Bad Request", code?: string) {
    super(400, message, code);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = "Unauthorized", code?: string) {
    super(401, message, code);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = "Forbidden", code?: string) {
    super(403, message, code);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = "Not Found", code?: string) {
    super(404, message, code);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends HttpError {
  constructor(message: string = "Conflict", code?: string) {
    super(409, message, code);
    this.name = "ConflictError";
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message: string = "Unprocessable Entity", code?: string) {
    super(422, message, code);
    this.name = "UnprocessableEntityError";
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string = "Internal Server Error", code?: string) {
    super(500, message, code);
    this.name = "InternalServerError";
  }
}
