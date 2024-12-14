import type { Request, Response, NextFunction } from "express";
import { getTokenInfo } from "../utils/token";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = getTokenInfo({ req });
  return token?.is_valid_token
    ? next()
    : res.status(408).json({
        error: "Unauthorized",
        message: "Unauthorized. Please login again",
      });
};
