import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import dotenv from "dotenv";

dotenv.config();
const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY
  })
);

const sendConfirmationEmail = async (user) => {
  const url = `${process.env.APP_URL}/verified`;
  await transport.sendMail({
    from: `${process.env.EMAIL_SENDER}`,
    to: `${user.fullname} <${user.email}>`,
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `Confirmation Message <a href=${url}>${url}</a>`,
  });
};

export default {
  sendConfirmationEmail
};
