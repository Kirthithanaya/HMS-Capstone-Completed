import nodemailer from "nodemailer";

const sendEmail = async (userId, message) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.PASS_MAIL,
      pass: process.env.PASS_KEY,
    },
  });

  await transporter.sendMail({
    from: process.env.PASS_MAIL,
    to: "kirthikiruthika@gmail.com",
    subject: "Hostel Notification",
    text: message,
  });
};

export default sendEmail;
