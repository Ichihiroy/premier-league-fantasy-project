import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("4000"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default("7d"),

  // AWS S3 Configuration
  AWS_REGION: z.string().default("us-east-1"),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  S3_BUCKET_NAME: z.string().optional(),

  // CORS
  CORS_ORIGIN: z.string().default("http://localhost:3000"),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().default("900000"), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: z.string().default("100"),
});

const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parseResult.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  NODE_ENV: parseResult.data.NODE_ENV,
  PORT: parseInt(parseResult.data.PORT),
  DATABASE_URL: parseResult.data.DATABASE_URL,
  JWT_SECRET: parseResult.data.JWT_SECRET,
  JWT_EXPIRES_IN: parseResult.data.JWT_EXPIRES_IN,

  AWS_REGION: parseResult.data.AWS_REGION,
  AWS_ACCESS_KEY_ID: parseResult.data.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: parseResult.data.AWS_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME: parseResult.data.S3_BUCKET_NAME,

  CORS_ORIGIN: parseResult.data.CORS_ORIGIN,

  RATE_LIMIT_WINDOW_MS: parseInt(parseResult.data.RATE_LIMIT_WINDOW_MS),
  RATE_LIMIT_MAX_REQUESTS: parseInt(parseResult.data.RATE_LIMIT_MAX_REQUESTS),

  // Computed values
  isDevelopment: parseResult.data.NODE_ENV === "development",
  isProduction: parseResult.data.NODE_ENV === "production",
  isTest: parseResult.data.NODE_ENV === "test",
};

export type Env = typeof env;
