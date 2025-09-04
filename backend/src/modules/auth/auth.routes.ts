import { Router } from "express";
import { authController } from "./auth.controller";
import { authenticate } from "../../middlewares/auth";
import { authRateLimit } from "../../middlewares/rateLimit";

const router = Router();

// Public routes (with auth rate limiting)
router.post("/register", authRateLimit, authController.register);
router.post("/login", authRateLimit, authController.login);

// Protected routes (require authentication)
router.use(authenticate); // All routes below require authentication

router.get("/profile", authController.getProfile);
router.put("/profile", authController.updateProfile);
router.put("/change-password", authController.changePassword);
router.post("/logout", authController.logout);
router.delete("/account", authController.deleteAccount);

export default router;
