import Groq from "groq-sdk";

const generateAISummary = async (auditData) => {
  try {

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion =
      await groq.chat.completions.create({

        model: "llama-3.1-8b-instant",

        max_tokens: 300,

        messages: [
          {
            role: "user",

            content: `
You are an AI cost optimization assistant.

Generate a professional audit summary using ONLY the provided data.

DO NOT:
- invent seats
- invent workflows
- invent usage analytics
- invent inactive users
- invent technical infrastructure

ONLY talk about:
- current AI tool usage
- estimated savings
- optimization opportunity
- recommendation already provided

Audit Data:

Team Size: ${auditData.teamSize}

Use Case: ${auditData.useCase}

Tools:
${auditData.tools
  .map(
    (t) =>
      `${t.toolName} - $${t.monthlySpend}/month`
  )
  .join("\n")}

Estimated Monthly Savings:
$${auditData.totalMonthlySavings}

Estimated Annual Savings:
$${auditData.totalAnnualSavings}

Recommendations:
${auditData.recommendations
  ?.map((r) => `- ${r.recommendation}`)
  .join("\n")}

Write:
- 120-150 words
- professional tone
- no fake assumptions
- no bullet points
- plain paragraph only
`,
          },
        ],
      });

    return completion
      .choices[0]
      .message.content;

  } catch (error) {

    console.log("Groq Error:", error);

    return `
Based on your audit, your team of ${auditData.teamSize} can save approximately $${auditData.totalMonthlySavings}/month ($${auditData.totalAnnualSavings}/year) across your AI tooling stack. SpendLens identified optimization opportunities based on pricing benchmarks and current tool usage. Reviewing your existing plans and reducing unnecessary overspending may help improve overall AI cost efficiency while maintaining productivity for your ${auditData.useCase} workflows.
`;
  }
};

export default generateAISummary;