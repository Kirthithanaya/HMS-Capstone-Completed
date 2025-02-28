import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["maintenance", "billing", "room"], required: true },
    message: { type: String, required: true },
    method: { type: String, enum: ["email", "sms", "in-app"], required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", NotificationSchema);