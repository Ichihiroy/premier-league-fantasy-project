import { env } from "../config/env";

type LogLevel = "info" | "warn" | "error" | "debug";

class Logger {
  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaString = meta ? ` | ${JSON.stringify(meta)}` : "";
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaString}`;
  }

  info(message: string, meta?: any): void {
    console.log(this.formatMessage("info", message, meta));
  }

  warn(message: string, meta?: any): void {
    console.warn(this.formatMessage("warn", message, meta));
  }

  error(message: string, error?: Error | any): void {
    const errorMeta =
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error;
    console.error(this.formatMessage("error", message, errorMeta));
  }

  debug(message: string, meta?: any): void {
    if (env.isDevelopment) {
      console.debug(this.formatMessage("debug", message, meta));
    }
  }

  // Express middleware for request logging
  requestLogger() {
    return (req: any, res: any, next: any) => {
      const start = Date.now();

      res.on("finish", () => {
        const duration = Date.now() - start;
        const logData = {
          method: req.method,
          url: req.url,
          status: res.statusCode,
          duration: `${duration}ms`,
          userAgent: req.get("User-Agent"),
          ip: req.ip,
        };

        if (res.statusCode >= 400) {
          this.warn("HTTP Request", logData);
        } else {
          this.info("HTTP Request", logData);
        }
      });

      next();
    };
  }
}

export const logger = new Logger();
