import Lead from "../models/Lead.js";

import sendAuditEmail from "../services/emailService.js";

import Audit from "../models/Audit.js";

const saveLead = async (req, res) => {
  try {
    const { email, companyName, role, teamSize, auditId } = req.body;

    const lead = await Lead.create({
      email,
      companyName,
      role,
      teamSize,
    });

    // ✅ Send response immediately
    res.status(201).json({
      success: true,
      lead,
    });

    // ✅ Background task safely
    process.nextTick(async () => {
      try {
        const audit = await Audit.findById(auditId);

        if (audit) {
          await sendAuditEmail(email, audit);
          console.log("EMAIL SENT SUCCESSFULLY");
        }
      } catch (err) {
        console.log("BACKGROUND EMAIL ERROR:", err);
      }
    });

  } catch (error) {
    console.log("LEAD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export { saveLead };