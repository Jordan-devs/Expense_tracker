import type { Response } from "express";
import jwt from "jsonwebtoken";

export const generateAccessToken = (
  res: Response,
  id: number,
  secret: string
) => {
  const isProduction = (process.env.NODE_ENV as string) === "production";

  const accessToken = jwt.sign({ id }, secret, {
    expiresIn: "15m",
  });

  return res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
  });
};

export const generateRefreshToken = (
  res: Response,
  id: number,
  secret: string
) => {
  const isProduction = (process.env.NODE_ENV as string) === "production";

  const refreshToken = jwt.sign({ id }, secret, {
    expiresIn: "7d",
  });

  return res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
