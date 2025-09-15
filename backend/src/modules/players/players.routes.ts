import { Router } from "express";
import * as playersController from "./players.controller";

const router = Router();

// GET /api/players
router.get("/", playersController.getAllPlayers);

router.get("/:playerId", playersController.getPlayerById);

export default router;
