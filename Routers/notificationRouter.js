import express from "express";
import Notification from "../models/Notification.js";
import { sendEmail } from "../utils/sendEmail.js";


const router = express.Router();

// ✅ Send Notification (Email, SMS, or In-App)
router.post("/send", async (req, res) => {
    try {
        const { userId, type, message, method, email, phone } = req.body;

        const notification = new email({ userId, type, message, method });
        await notification.email.save();

        await sendEmail({email, phone, message,method  });

        res.status(200).json({message: "Notification sent!", success: true  });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ Fetch Notifications for a User
router.get("/:userId", async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ Mark Notification as Read
router.put("/mark-read/:id", async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { read: true });
        res.json({ success: true, message: "Notification marked as read!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
