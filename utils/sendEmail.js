import nodemailer from "nodemailer";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.PASS_MAIL,
        pass: process.env.PASS_KEY,
    },
});

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendEmail = async ({ email, phone, message, method }) => {
    try {
        if (method === "email" && email) {
            await transporter.sendMail({
                from: process.env.PASS_MAIL,
                to: email,
                subject: "New Notification",
                text: message,
            });
            console.log("📩 Email sent successfully!");
        } else if (method === "sms" && phone) {
            await twilioClient.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone,
            });
            console.log("📱 SMS sent successfully!");
        }
    } catch (error) {
        console.error("Notification sending failed:", error);
    }
};
