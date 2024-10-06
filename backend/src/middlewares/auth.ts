import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = "your_secret_key";

interface AuthenticatedRequest extends Request {
  user?: any;
  file?: Express.Multer.File;
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as any;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};