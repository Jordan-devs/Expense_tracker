import { Router } from "express";
import {
  loginUser,
  refreshToken,
  registerUser,
  verifyToken,
} from "../controllers/auth.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.post("/login", loginUser);

router.post("/signup", upload.single("avatar"), registerUser);

router.post("/refresh", refreshToken);

router.get("/verify-auth", verifyToken);

export default router;
