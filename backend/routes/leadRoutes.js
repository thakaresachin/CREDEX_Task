import express from "express";

import { saveLead } from "../controllers/leadController.js";

const router = express.Router();

router.post("/save", saveLead);

export default router;