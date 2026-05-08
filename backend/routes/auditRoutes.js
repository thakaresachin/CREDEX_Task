import express from "express";

import {
  calculateAudit,
  getSharedAudit,
} from "../controllers/auditController.js";

const router = express.Router();

router.post("/calculate", calculateAudit);

router.get("/share/:shareId", getSharedAudit);

export default router;