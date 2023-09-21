import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { to } = req.body;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "holamilean56@gmail.com",
      to: to,
      subject: "Welcome to SaveYourCrypto Platform",
      text: "Welcome to SaveYourCrypto Platform",
      html: `
        <div style="background-color: white; padding: 20px; border: 1px solid #ccc; text-align:center;">
          <p style="font-size: 24px; font-weight: bold; color: black; ">
            Save<span style="color: #007BFF;">YOUR</span>Crypto
          </p>
          <p>This is your code generated by SaveYourCrypto just for you:</p>
          <p style="font-size: 24px; font-weight: bold; color: #007BFF;">12345</p>
          <p>Thank you for saving your crypto!</p>
        </div>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
