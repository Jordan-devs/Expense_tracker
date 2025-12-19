import { Router } from "express";
import {
  getUser,
  loginUser,
  refreshToken,
  registerUser,
} from "../controllers/auth.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login", loginUser);

router.post("/signup", upload.single("avatar"), registerUser);

router.post("/refresh", refreshToken);

router.get("/verify-auth", authMiddleware, getUser);

export default router;
