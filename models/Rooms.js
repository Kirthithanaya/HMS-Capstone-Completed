import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["Single", "Double", "Suite"],
    required: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
  resident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resident",
    default: null,
  },
});

export default mongoose.model("Room", roomSchema);