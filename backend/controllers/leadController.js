import Lead from "../models/Lead.js";

import sendAuditEmail from "../services/emailService.js";

import Audit from "../models/Audit.js";

const saveLead = async (req, res) => {
  try {
    const {
      email,
      companyName,
      role,
      teamSize,
      auditId,
    } = req.body;

    const lead = await Lead.create({
      email,
      companyName,
      role,
      teamSize,
    });

    const audit = await Audit.findById(auditId);

    if (audit) {
      await sendAuditEmail(email, audit);
    }

    res.status(201).json({
      success: true,
      lead,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Lead save failed",
    });
  }
};

export { saveLead };