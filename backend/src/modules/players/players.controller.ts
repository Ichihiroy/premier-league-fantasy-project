import { Request, Response, NextFunction } from "express";
import * as playerService from "./players.service";

export const getAllPlayers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const players = await playerService.getAllPlayers();
    res.json(players);
  } catch (err) {
    next(err);
  }
};
