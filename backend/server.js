import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import auditRoutes from "./routes/auditRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";

connectDB();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://credex-task-peach.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Credex AI Spend Audit API Running...");
});

app.use("/api/audit", auditRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/leads", leadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});