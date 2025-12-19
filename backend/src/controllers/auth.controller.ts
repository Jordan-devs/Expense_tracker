import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import db from "../db/connectDB.js";
import { users } from "../db/schema.js";
import type { LoginDTO, RegisterUserDTO } from "../dtos/dtos.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokenWithCookies.js";
import { errorResponse, successResponse } from "../utils/response.js";

export async function registerUser(
  req: Request<{}, {}, RegisterUserDTO>,
  res: Response
) {
  const { username, email, password } = req.body;
  const file = req.file;

  let avatarUrl: string | null = null;

  const jwtSecret = process.env.JWT_SECRET as string;

  if (!username || !email || !password) {
    errorResponse(res, 400, "All fields are required");
    return;
  }

  if (!jwtSecret) {
    console.error("jwt secret not configured");
    return res
      .status(500)
      .json({ success: false, message: "Jwt secret not configured" });
  }

  try {
    // checking if user exist
    const checkUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (checkUser.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Email already taken" });
    }

    if (file) {
      try {
        const b64 = Buffer.from(file.buffer).toString("base64");
        const dataURI = `data:${file.mimetype};base64,${b64}`;

        const result = await cloudinary.uploader.upload(dataURI, {
          folder: "expense-tracker/avatars",
          resource_type: "image",
        });

        avatarUrl = result.secure_url;
      } catch (error) {
        console.error("An error occurred during upload", error);
        return res
          .status(500)
          .json({ success: false, message: "An error occurred during upload" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // register the user
    const [addUser] = await db
      .insert(users)
      .values({
        username,
        email,
        avatarUrl,
        password: hashedPassword,
      })
      .returning();

    if (!addUser) {
      return res
        .status(500)
        .json({ success: false, message: "Error registering users" });
    }

    generateAccessToken(res, addUser.id, jwtSecret);
    generateRefreshToken(res, addUser.id, jwtSecret);

    return res.status(201).json({
      success: true,
      message: "User successfully created",
      user: {
        id: addUser.id,
        email: addUser.email,
        username: addUser.username,
        avatarUrl: addUser.avatarUrl,
      },
    });
  } catch (error) {
    console.log("Error registering user", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while registering user",
    });
  }
}

export async function loginUser(req: Request<{}, {}, LoginDTO>, res: Response) {
  const { email, password } = req.body;

  const jwtSecret = process.env.JWT_SECRET as string;

  if (!email || !password) {
    errorResponse(res, 400, "All fields are required");
    return;
  }

  if (!jwtSecret) {
    console.error("jwt secret not configured");
    return res
      .status(500)
      .json({ success: false, message: "Jwt secret not configured" });
  }

  try {
    // check if user exists
    const [checkUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!checkUser) {
      return res
        .status(409)
        .json({ success: false, message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, checkUser.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password" });
    }

    generateAccessToken(res, checkUser.id, jwtSecret);

    generateRefreshToken(res, checkUser.id, jwtSecret);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: checkUser.id,
        email: checkUser.email,
        username: checkUser.username,
        avatarUrl: checkUser.avatarUrl,
      },
    });
  } catch (error) {
    console.error("An error occurred during login", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during login" });
  }
}

export async function refreshToken(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    console.error("refresh token not found");
    return res.status(401).json({ success: false, message: "Token not found" });
  }

  const jwtSecret = process.env.JWT_SECRET as string;

  if (!jwtSecret) {
    console.error("jwt secret has not been configured");
    return res
      .status(500)
      .json({ success: false, message: "jwt secret has not been configured" });
  }

  try {
    const decoded = jwt.verify(refreshToken, jwtSecret) as { id: number };

    generateAccessToken(res, decoded.id, jwtSecret);
    res
      .status(200)
      .json({ success: true, message: "Access token refreshed successfully" });
  } catch (error) {
    console.error("An error occurred while decoding");
    return res
      .status(403)
      .json({ success: false, message: "An error occurred while decoding" });
  }
}

export async function getUserInfo(req: Request, res: Response) {
  const id = req.userId!;

  try {
    const [userInfo] = await db.select().from(users).where(eq(users.id, id));

    successResponse(res, 200, "user data gotten", {
      ...userInfo,
      password: null,
    });
  } catch (error) {
    console.error("An error occurred while fetching data");
    errorResponse(res, 500, "An error occurred while fetching data");
  }
}
