import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, text) => {
  const msg = {
    to,
    from: "admin@hostel.com",
    subject,
    text,
  };

  await sgMail.send(msg);
};
