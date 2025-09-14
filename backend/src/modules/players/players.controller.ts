import { Request, Response, NextFunction } from "express";
import * as playerService from "./players.service";

export const getAllPlayers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const players = await playerService.getAllPlayers();
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
