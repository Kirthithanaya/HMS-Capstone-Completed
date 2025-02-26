import express from "express";
import { getNotifications, sendNotification } from "../controllers/notificationController.js";
import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/send", authMiddleware, sendNotification);
router.get("/", authMiddleware, getNotifications);

export default router;