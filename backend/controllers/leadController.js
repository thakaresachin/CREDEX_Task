import Lead from "../models/Lead.js";

import sendAuditEmail from "../services/emailService.js";

import Audit from "../models/Audit.js";

const saveLead = async (req, res) => {
  try {
    const { email, companyName, role, teamSize, auditId } = req.body;

    const lead = await Lead.create({ email, companyName, role, teamSize });

    const audit = await Audit.findById(auditId);

    // ✅ Respond immediately — don't wait for email
    res.status(201).json({ success: true, lead });

    // ✅ Send email in background (after response)
    if (audit) {
      sendAuditEmail(email, audit).catch((err) => {
        console.log("Background email error:", err.message);
      });
    }

  } catch (error) {
    console.log("LEAD ERROR:", error);
    res.status(500).json({ success: false, message: "Lead save failed" });
  }
};

export { saveLead };