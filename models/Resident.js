import mongoose from "mongoose";

const residentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    checkInDate: {
      type: Date,
    },
    checkOutDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Resident = mongoose.model("Resident", residentSchema);

export default Resident;
