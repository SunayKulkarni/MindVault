import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "./config";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function userMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const header: string | undefined = req.headers["authorization"];

  const decodedData = jwt.verify(header as string, JWT_SECRET!);

  if (decodedData) {
    //@ts-ignore
    req.userId = decodedData.id;
    next();
  } else {
    res.status(403).json({
      message: "Not Logged in",
    });
  }
}
