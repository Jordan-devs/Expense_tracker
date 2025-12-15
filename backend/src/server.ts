import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
  await testConnection();
  console.log(`Server is running on port ${PORT}`);
});
