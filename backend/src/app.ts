import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./middlewares/error";
import { generalRateLimit } from "./middlewares/rateLimit";
import routes from "./routes";
// import { logger } from "./libs/logger";

const app = express();

// Trust proxy for rate limiting and IP detection
app.set("trust proxy", 1);

// Security middleware
app.use(helmet());

// CORS configuration

const ALLOW_ORIGINS = (env.CORS_ORIGIN ?? "")
  .split(/[,\s]+/)
  .filter(Boolean); 

console.log("🌍 CORS Allowed Origins:", ALLOW_ORIGINS);

app.use(cors({
  origin(origin, cb) {
    console.log("🔍 CORS Request Origin:", origin);
    // allow server-to-server & same-origin (no Origin header)
    if (!origin) {
      console.log("✅ CORS: No origin (same-origin or server-to-server), allowing");
      return cb(null, true);
    }
    if (ALLOW_ORIGINS.includes(origin)) {
      console.log("✅ CORS: Origin allowed");
      return cb(null, true);
    }
    console.log("❌ CORS: Origin rejected");
    cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Compression middleware
app.use(compression());

// Request logging
if (env.isDevelopment) {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Rate limiting
app.use(generalRateLimit);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Cookie parsing middleware
app.use(cookieParser());

// Health check endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    version: process.env.npm_package_version || "1.0.0",
  });
});

// API routes
app.use("/api", routes);

// Handle 404 for unmatched routes
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
