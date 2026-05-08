import nodemailer from "nodemailer";

const sendAuditEmail = async (email, audit) => {
  // ✅ Transporter created inside function so env vars are loaded
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

    await transporter.verify();
    console.log("SMTP READY");

    const recommendationsHTML = audit.recommendations
      .map(
        (item) => `
        <div style="border:1px solid #eee;padding:15px;margin-bottom:10px;border-radius:10px;">
          <h3>${item.tool}</h3>
          <p><b>Current:</b> $${item.currentSpend}/mo</p>
          <p><b>Optimized:</b> $${item.recommendedSpend}/mo</p>
          <p><b>Savings:</b> $${item.savings}/mo · $${item.savings * 12}/yr</p>
          <p>${item.recommendation}</p>
        </div>
      `
      )
      .join("");

    await transporter.sendMail({
      from: `"Credex AI Audit" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your AI Spend Audit Report",
      html: `
      <div style="font-family:Arial;padding:30px;background:#f5f5f5;">
        <div style="max-width:700px;margin:auto;background:white;padding:30px;border-radius:16px;">
          <h1>AI Spend Audit Report</h1>
          <h2>Potential Savings</h2>
          <p><b>Monthly Savings:</b> $${audit.totalMonthlySavings}/mo</p>
          <p><b>Annual Savings:</b> $${audit.totalAnnualSavings}/yr</p>
          <hr style="margin:20px 0;" />
          <h2>Per-Tool Breakdown</h2>
          ${recommendationsHTML}
          <hr style="margin:20px 0;" />
          <h2>AI Generated Summary</h2>
          <p>${audit.summary || "Summary not available"}</p>
          <br />
          <p>Thank you for using Credex AI Spend Audit.</p>
        </div>
      </div>
      `,
    });

    console.log("EMAIL SENT SUCCESSFULLY");
  } catch (error) {
    console.log("EMAIL ERROR:", error.message);
    throw error;
  }
};

export default sendAuditEmail;