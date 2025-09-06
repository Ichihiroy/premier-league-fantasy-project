import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  updateProfileSchema,
} from "./auth.schemas";
import { AuthenticatedRequest } from "../../middlewares/auth";
import { logger } from "../../libs/logger";

export class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = registerSchema.parse(req.body);
      const result = await authService.register(data);

      logger.info("User registered successfully", { email: data.email });

      // Debug: Log the token being set
      console.log(
        "🍪 Setting cookie with token:",
        result.token.substring(0, 20) + "..."
      );

      // Set HTTP-only cookie with the token
      res.cookie("authToken", result.token, {
        httpOnly: true,
        secure: false, // Set to false for localhost development
        sameSite: "lax", // Changed from strict to lax for localhost
        path: "/", // Ensure cookie is sent on all routes
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      });

      console.log("🍪 Cookie set successfully");

      res.status(201).json({
        message: "User registered successfully",
        data: {
          user: result.user,
          token: result.token, // Still include in response for frontend compatibility
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = loginSchema.parse(req.body);
      const result = await authService.login(data);

      logger.info("User logged in successfully", { email: data.email });

      // Debug: Log the token being set
      console.log(
        "🍪 Setting cookie with token:",
        result.token.substring(0, 20) + "..."
      );

      // Set HTTP-only cookie with the token
      console.log("🍪 Setting cookie with options:", {
        httpOnly: false, // Temporarily disabled for debugging
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.cookie("authToken", result.token, {
        httpOnly: false, // Temporarily set to false for debugging
        secure: false, // Set to false for localhost development
        sameSite: "lax", // Changed from strict to lax for localhost
        path: "/", // Ensure cookie is sent on all routes
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      });

      console.log("🍪 Cookie set successfully (httpOnly: false for debugging)");
      
      // Log response headers to verify cookie is being sent
      const headers = res.getHeaders();
      console.log("📤 Response headers before sending:");
      console.log(JSON.stringify(headers, null, 2));
      console.log("📤 Set-Cookie header specifically:", headers['set-cookie']);

      res.status(200).json({
        message: "Login successful",
        data: {
          user: result.user,
          token: result.token, // Still include in response for frontend compatibility
        },
      });
      
      console.log("📨 Response sent to client");
    } catch (error) {
      next(error);
    }
  }

  async getProfile(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        return next(new Error("User not authenticated"));
      }

      const profile = await authService.getProfile(req.user.id);

      res.status(200).json({
        message: "Profile retrieved successfully",
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        return next(new Error("User not authenticated"));
      }

      const data = updateProfileSchema.parse(req.body);
      const updatedProfile = await authService.updateProfile(req.user.id, data);

      logger.info("User profile updated", { userId: req.user.id });

      res.status(200).json({
        message: "Profile updated successfully",
        data: updatedProfile,
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        return next(new Error("User not authenticated"));
      }

      const data = changePasswordSchema.parse(req.body);
      const result = await authService.changePassword(req.user.id, data);

      logger.info("User changed password", { userId: req.user.id });

      res.status(200).json({
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteAccount(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        return next(new Error("User not authenticated"));
      }

      await authService.deleteAccount(req.user.id);

      logger.info("User account deleted", { userId: req.user.id });

      res.status(200).json({
        message: "Account deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // Test endpoint to verify cookie setting works
  async testCookie(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("🧪 Testing cookie functionality");
      console.log("🔍 Request Origin:", req.get('Origin'));
      console.log("🔍 Request headers:", req.headers);
      
      res.cookie("test-cookie", "test-value", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60000, // 1 minute
      });
      
      console.log("🍪 Test cookie set");
      const headers = res.getHeaders();
      console.log("📤 Response headers:");
      console.log(JSON.stringify(headers, null, 2));
      console.log("📤 Set-Cookie header specifically:", headers['set-cookie']);
      
      res.json({ message: "Test cookie set", timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  }

  async logout(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Clear the authentication cookie
      res.clearCookie("authToken", {
        httpOnly: true,
        secure: false, // Set to false for localhost development
        sameSite: "lax", // Changed from strict to lax for localhost
      });

      if (req.user) {
        logger.info("User logged out", { userId: req.user.id });
      }

      res.status(200).json({
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
