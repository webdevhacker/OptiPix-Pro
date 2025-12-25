const styles = {
    container: `background-color: #f8fafc; padding: 40px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;`,
    card: `background-color: #ffffff; width: 100%; max-width: 600px; margin: 0 auto; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); overflow: hidden; border: 1px solid #e2e8f0;`,
    header: `background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 32px; text-align: center;`,
    headerText: `color: #ffffff; font-size: 26px; font-weight: bold; margin: 0; letter-spacing: 0.5px;`,
    body: `padding: 40px; color: #334155; line-height: 1.6; font-size: 16px;`,
    button: `display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; margin-top: 20px; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);`,
    otpBox: `background-color: #f1f5f9; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0; border: 2px dashed #cbd5e1;`,
    otpCode: `font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #4f46e5; margin: 0; font-family: 'Courier New', monospace;`,
    footer: `background-color: #f8fafc; padding: 24px; text-align: center; color: #94a3b8; font-size: 13px; border-top: 1px solid #e2e8f0;`
};

// Template for Email Verification
exports.verificationTemplate = (url) => `
  <div style="${styles.container}">
    <div style="${styles.card}">
      <div style="${styles.header}">
        <h1 style="${styles.headerText}">OptiPix Pro</h1>
      </div>
      <div style="${styles.body}">
        <h2 style="margin-top:0; color: #1e293b;">Verify your email address</h2>
        <p>Thanks for joining OptiPix Pro! We're excited to have you on board.</p>
        <p>Please click the button below to verify your email address and activate your account:</p>
        <div style="text-align: center;">
          <a href="${url}" style="${styles.button}">Verify Email</a>
        </div>
        <p style="font-size: 14px; color: #64748b; margin-top: 30px;">If the button doesn't work, copy this link:<br><a href="${url}" style="color: #4f46e5; word-break: break-all;">${url}</a></p>
      </div>
      <div style="${styles.footer}">
        &copy; ${new Date().getFullYear()} OptiPix Pro. All rights reserved.
      </div>
    </div>
  </div>
`;

// Template for OTP Password Reset
exports.otpTemplate = (otp) => `
  <div style="${styles.container}">
    <div style="${styles.card}">
      <div style="${styles.header}">
        <h1 style="${styles.headerText}">OptiPix Pro</h1>
      </div>
      <div style="${styles.body}">
        <h2 style="margin-top:0; color: #1e293b;">Password Reset Request</h2>
        <p>We received a request to reset your password. Use the code below to proceed.</p>
        <div style="${styles.otpBox}">
          <p style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: bold;">Your Security Code</p>
          <p style="${styles.otpCode}">${otp}</p>
        </div>
        <p>This code will expire in 10 minutes. If you didn't request this, you can safely ignore this email.</p>
      </div>
      <div style="${styles.footer}">
        &copy; ${new Date().getFullYear()} OptiPix Pro. All rights reserved.
      </div>
    </div>
  </div>
`;