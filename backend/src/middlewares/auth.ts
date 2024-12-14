import type { Request, Response, NextFunction } from "express";
import { getTokenInfo } from "../utils/token";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getTokenInfo({ req });
  return token?.is_valid_token
    ? next()
    : res.status(408).send({ error: "Unauthorized" });
};
