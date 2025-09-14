import { Router } from "express";
import * as playersController from "./players.controller";

const router = Router();

// GET /api/players
router.get("/", playersController.getAllPlayers);

export default router;
