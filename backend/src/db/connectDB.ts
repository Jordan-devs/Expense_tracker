import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import * as schema from "./schema.js";

dotenv.config();
const connectionString = process.env.DATABASE_URL as string;
const queryClient = postgres(connectionString);

const db = drizzle(queryClient, { schema });

export const testConnection = async () => {
  try {
    await db.execute(`select 1`);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

export default db;
