import { Router } from "express";
import { collectionService } from "./collection.service";

const router = Router();

// POST /api/collection/buy
router.post("/buy", async (req, res, next) => {
  try {
    const { userId, playerId } = req.body;
    if (!userId || !playerId) {
      return res
        .status(400)
        .json({ message: "userId and playerId are required" });
    }
    await collectionService.buyPlayer(userId, playerId);
    return res.json({ message: "Player purchased and added to collection" });
  } catch (err: any) {
    if (err.message === "User or player not found") {
      return res.status(404).json({ message: err.message });
    }
    if (
      err.message === "Insufficient balance" ||
      err.message === "User balance not set"
    ) {
      return res.status(400).json({ message: err.message });
    }
    return next(err);
  }
});

export default router;
