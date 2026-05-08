import Audit from "../models/Audit.js";

import generateAISummary from "../services/openaiService.js";

const createSummary = async (req, res) => {
  try {
    const { auditId } = req.body;

    const audit = await Audit.findById(auditId);

    if (!audit) {
      return res.status(404).json({
        success: false,
        message: "Audit not found",
      });
    }

    const summary = await generateAISummary(audit);

    audit.summary = summary;

    await audit.save();

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI Summary Failed",
    });
  }
};

export { createSummary };