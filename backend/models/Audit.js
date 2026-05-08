import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(
  {
    tools: [
      {
        toolName: String,
        plan: String,
        monthlySpend: Number,
        seats: Number,
      },
    ],

    recommendations: [
      {
        tool: String,
        currentSpend: Number,
        recommendedSpend: Number,
        savings: Number,
        optimizationPercent: Number,
        recommendation: String,
      },
    ],

    teamSize: Number,

    useCase: String,

    totalMonthlySavings: Number,

    totalAnnualSavings: Number,

    summary: String,

    shareId: String,
  },
  {
    timestamps: true,
  }
);

const Audit = mongoose.model("Audit", auditSchema);

export default Audit;