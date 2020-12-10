import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import dotenv from "dotenv";

dotenv.config();
const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
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

const sendNotificationEmailToManagerOnEdit = async (manager, tripRequest) => {
  const url = `${process.env.APP_URL}/requests/${tripRequest.id}`;
  await transport.sendMail({
    from: `${process.env.EMAIL_SENDER}`,
    to: `${manager.fullname} <${manager.email}>`,
    subject: "Notification: Trip Request edited",
    html: `<div><p>Hi ${manager.fullname}, This is to notify you that a trip request has been edited.</p> <p>You can access the updated trip request via <a href=${url}>${url}</a></p></div>`,
  });
};

export default {
  sendConfirmationEmail,
  sendNotificationEmailToManagerOnEdit,
};
