import { Router } from "express";
import {
  loginUser,
  refreshToken,
  registerUser,
} from "../controllers/auth.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.post("/login", loginUser);

router.post("/register", upload.single("avatar"), registerUser);

router.post("/refresh", refreshToken);

export default router;
