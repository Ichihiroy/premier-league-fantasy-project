import { Request, Response, NextFunction } from "express";
import { playersService } from "./players.service";

export const getAllPlayers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const players = await playersService.getAllPlayers();
    res.json({
      data: players,
      meta: {
        page: 1,
        per_page: players.length,
        total: players.length,
        total_pages: 1,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getPlayerById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = String(req.params.id);

    const player = await playersService.getPlayerById(id);

    if (!player) {
      res.status(404).json({ message: "Player not found" });
      return;
    }

    res.status(200).json(player);
    return;
  } catch (err) {
    next(err);
    return;
  }
};
