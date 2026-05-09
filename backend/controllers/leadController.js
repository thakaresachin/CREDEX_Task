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

    const audit = await Audit.findById(auditId);

    // ✅ response immediately
    res.status(201).json({
      success: true,
      lead,
    });

    // ✅ send mail after response
    if (audit) {
      setImmediate(async () => {
        try {
          await sendAuditEmail(email, audit);
          console.log("EMAIL SENT");
        } catch (err) {
          console.log("EMAIL ERROR:", err.message);
        }
      });
    }

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export { saveLead };