import nodemailer from "nodemailer";

const sendAuditEmail = async (email, audit) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const recommendationsHTML = audit.recommendations
      .map(
        (item) => `
        <div style="border:1px solid #eee;padding:15px;margin-bottom:10px;border-radius:10px;">
          <h3>${item.tool}</h3>

          <p><b>Current:</b> $${item.currentSpend}/mo</p>

          <p><b>Optimized:</b> $${item.recommendedSpend}/mo</p>

          <p><b>Savings:</b> $${item.savings}/mo · $${
          item.savings * 12
        }/yr</p>

          <p>${item.recommendation}</p>
        </div>
      `
      )
      .join("");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: email,

      subject: "Your AI Spend Audit Report",

      html: `
      <div style="font-family:Arial;padding:30px;background:#f5f5f5;">

        <div style="max-width:700px;margin:auto;background:white;padding:30px;border-radius:16px;">

          <h1>AI Spend Audit Report</h1>

          <h2>Potential Savings</h2>

          <p><b>Monthly Savings:</b> $${
            audit.totalMonthlySavings
          }/mo</p>

          <p><b>Annual Savings:</b> $${
            audit.totalAnnualSavings
          }/yr</p>

          <hr style="margin:20px 0;" />

          <h2>Per-Tool Breakdown</h2>

          ${recommendationsHTML}

          <hr style="margin:20px 0;" />

          <h2>AI Generated Summary</h2>

          <p>${audit.summary}</p>

          <br />

          <p>Thank you for using Credex AI Spend Audit.</p>

        </div>

      </div>
      `,
    });

    console.log("Email Sent Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default sendAuditEmail;