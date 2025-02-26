import Notification from "../models/Notification.js";
import sendEmail from "../utils/sendEmail.js";
import sendSMS from "../utils/sendSMS.js";

// Send notification
export const sendNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;

    const notification = new Notification({ userId, message, type });
    await notification.save();

    if (type === "Email") await sendEmail(userId, message);
    if (type === "SMS") await sendSMS(userId, message);

    res.status(201).json({ message: "Notification sent successfully", notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
