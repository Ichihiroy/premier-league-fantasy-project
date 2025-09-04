import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/httpErrors";
import { logger } from "../libs/logger";
import { env } from "../config/env";

interface ErrorResponse {
  error: {
    message: string;
    code?: string | undefined;
    details?: any;
    stack?: string;
  };
}

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  logger.error("Error occurred", {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const response: ErrorResponse = {
      error: {
        message: "Validation failed",
        code: "VALIDATION_ERROR",
        details: error.flatten().fieldErrors,
      },
    };
    res.status(400).json(response);
    return;
  }

  // Handle custom HTTP errors
  if (error instanceof HttpError) {
    const response: ErrorResponse = {
      error: {
        message: error.message,
        code: error.code,
      },
    };

    // Include stack trace in development
    if (env.isDevelopment && error.stack) {
      response.error.stack = error.stack;
    }

    res.status(error.statusCode).json(response);
    return;
  }

  // Handle Prisma errors
  if (error.name === "PrismaClientKnownRequestError") {
    const prismaError = error as any;

    switch (prismaError.code) {
      case "P2002":
        res.status(409).json({
          error: {
            message: "A record with this information already exists",
            code: "DUPLICATE_RECORD",
          },
        });
        return;

      case "P2025":
        res.status(404).json({
          error: {
            message: "Record not found",
            code: "RECORD_NOT_FOUND",
          },
        });
        return;
    }
  }

  // Handle JWT errors
  if (error.name === "JsonWebTokenError") {
    res.status(401).json({
      error: {
        message: "Invalid token",
        code: "INVALID_TOKEN",
      },
    });
    return;
  }

  if (error.name === "TokenExpiredError") {
    res.status(401).json({
      error: {
        message: "Token expired",
        code: "TOKEN_EXPIRED",
      },
    });
    return;
  }

  // Handle Multer errors (file upload)
  if (error.name === "MulterError") {
    const multerError = error as any;

    if (multerError.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({
        error: {
          message: "File size too large",
          code: "FILE_TOO_LARGE",
        },
      });
      return;
    }
  }

  // Default error response
  const response: ErrorResponse = {
    error: {
      message: env.isProduction ? "Internal server error" : error.message,
      code: "INTERNAL_SERVER_ERROR",
    },
  };

  // Include stack trace in development
  if (env.isDevelopment && error.stack) {
    response.error.stack = error.stack;
  }

  res.status(500).json(response);
}

// 404 handler for routes that don't exist
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    error: {
      message: `Route ${req.method} ${req.path} not found`,
      code: "ROUTE_NOT_FOUND",
    },
  });
}
