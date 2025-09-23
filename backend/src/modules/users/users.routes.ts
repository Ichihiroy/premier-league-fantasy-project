import { Router } from "express";
import { usersService } from "./users.service";

const router = Router();

// PATCH /api/users/:id/balance
router.patch(":id/balance", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { balance } = req.body;
    if (typeof balance !== "number") {
      return res.status(400).json({ message: "Balance must be a number" });
    }
    const user = await usersService.updateBalance(id, balance);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

export default router;
