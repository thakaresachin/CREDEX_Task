import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import auditRoutes from "./routes/auditRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
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