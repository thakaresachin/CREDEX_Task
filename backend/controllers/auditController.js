import Audit from "../models/Audit.js";

const generateShareId = () => {
  return Math.random().toString(36).substring(2, 10);
};

const calculateAudit = async (req, res) => {
  try {

    const {
      tools,
      teamSize,
      useCase,
    } = req.body;

    let totalMonthlySavings = 0;

    const recommendations = [];

    tools.forEach((tool) => {

      const currentSpend =
        Number(tool.monthlySpend);

      let recommendedSpend =
        currentSpend;

      let recommendation =
        "Current plan looks optimized.";

      let optimizationPercent = 0;

      // ChatGPT
      if (tool.toolName === "ChatGPT") {

        if (tool.plan === "Enterprise") {
          optimizationPercent = 35;
        }

        else if (tool.plan === "Team") {
          optimizationPercent = 20;
        }

        else if (tool.plan === "Plus") {
          optimizationPercent = 10;
        }

        recommendation =
          "Current ChatGPT configuration may have moderate optimization potential based on estimated usage patterns.";
      }

      // Claude
      else if (tool.toolName === "Claude") {

        optimizationPercent = 18;

        recommendation =
          "Current Claude spending indicates possible opportunities for improved cost efficiency.";
      }

      // Gemini
      else if (tool.toolName === "Gemini") {

        optimizationPercent = 12;

        recommendation =
          "Current Gemini configuration appears to have moderate optimization potential.";
      }

      // Cursor
      else if (tool.toolName === "Cursor") {

        optimizationPercent = 25;

        recommendation =
          "Cursor plan allocation may be higher than necessary for the selected workflow.";
      }

      // Copilot
      else if (tool.toolName === "Copilot") {

        optimizationPercent = 15;

        recommendation =
          "GitHub Copilot spending may be optimized through revised plan allocation.";
      }

      // OpenAI API
      else if (
        tool.toolName === "OpenAI API"
      ) {

        optimizationPercent = 30;

        recommendation =
          "OpenAI API usage may benefit from improved cost optimization strategies.";
      }

      // Anthropic API
      else if (
        tool.toolName === "Anthropic API"
      ) {

        optimizationPercent = 28;

        recommendation =
          "Anthropic API spending indicates potential opportunities for optimization.";
      }

      // Windsurf/v0
      else if (
        tool.toolName === "Windsurf/v0"
      ) {

        optimizationPercent = 22;

        recommendation =
          "Current Windsurf configuration may exceed estimated workflow requirements.";
      }

      recommendedSpend =
        currentSpend -
        (
          currentSpend *
          optimizationPercent
        ) / 100;

      const savings = Math.round(
        currentSpend - recommendedSpend
      );

      totalMonthlySavings += savings;

      recommendations.push({

        tool: tool.toolName,

        currentSpend,

        recommendedSpend:
          Math.round(recommendedSpend),

        savings,

        optimizationPercent,

        recommendation,
      });
    });

    const totalAnnualSavings =
      totalMonthlySavings * 12;

    const shareId = generateShareId();

    const audit = await Audit.create({

      tools,

      recommendations,

      teamSize,

      useCase,

      totalMonthlySavings,

      totalAnnualSavings,

      shareId,
    });

    res.status(200).json({

      success: true,

      audit,

      recommendations,

      totalMonthlySavings,

      totalAnnualSavings,

      shareId,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Audit calculation failed",
    });
  }
};

const getSharedAudit = async (req, res) => {
  try {

    const audit = await Audit.findOne({
      shareId: req.params.shareId,
    });

    if (!audit) {

      return res.status(404).json({
        success: false,
        message: "Audit not found",
      });
    }

    res.status(200).json({
      success: true,
      audit,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export {
  calculateAudit,
  getSharedAudit,
};