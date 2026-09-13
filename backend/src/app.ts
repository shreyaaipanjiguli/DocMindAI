import pool from "./config/database";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ message: "Backend and database are connected!" });
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ message: "Database connection failed" });
  }
});

export default app;