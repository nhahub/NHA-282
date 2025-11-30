import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // Looking to send emails in production? Check out our Email API/SMTP product!

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "c54c58a0e9ccd0",
      pass: "b7d1cdd01df94a",
    },
    // logger: true, // Enable logging to see debug info
    // debug: true, // Enable more deta
    tls: {
      rejectUnauthorized: false, // Accept self-signed certificates
    },
  });

  const emailOptions = {
    from: "3amak@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    const info = await transport.sendMail(emailOptions);
  } catch (error) {
    console.log("Error occurred while sending email:", error.message);
    console.log(error.stack); // Print detailed error stack for debugging
  }
};

export default sendEmail;
