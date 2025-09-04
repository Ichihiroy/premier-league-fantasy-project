import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes";
import playersRoutes from "./modules/players/players.routes";
import collectionRoutes from "./modules/collection/collection.routes";
import filesRoutes from "./modules/files/files.routes";

const router = Router();

// Mount feature routes
router.use("/auth", authRoutes);
router.use("/players", playersRoutes);
router.use("/collection", collectionRoutes);
router.use("/files", filesRoutes);

export default router;
