import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, async () => {
  await testConnection();
  console.log(`Server is running on port ${PORT}`);
});
