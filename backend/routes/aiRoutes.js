import express from "express";

import { createSummary } from "../controllers/aiController.js";

const router = express.Router();

router.post("/summary", createSummary);

export default router;