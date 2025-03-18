import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_CLERK_PUBLIC_KEY!, {
      algorithms: ["RS256"],
    });

    if (!decoded) {
      res.status(401).json({
        message: "Unauthorised",
      });
      return;
    }

    const userId = (decoded as any).payload.sub;
    if (!userId) {
      res.status(401).json({
        message: "Unauthorised",
      });
      return;
    }

    req.userId = userId;

    next();
  } catch (error) {
    console.log("Error in authMiddleware ", error);
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
};
