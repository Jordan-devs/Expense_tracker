import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;

  if (!token) {
    console.error("Token not Found");
    return res.status(401).json({ message: "Token not Found" });
  }

  const jwtSecret = process.env.JWT_SECRET as string;

  if (!jwtSecret) {
    console.error("JWT_SECRET key is not configured");
    return res
      .status(500)
      .json({ message: "JWT_SECRET key is not configured" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = (decoded as { id: number }).id;
    next();
  } catch (error) {
    console.error("Error verifying tokens:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
