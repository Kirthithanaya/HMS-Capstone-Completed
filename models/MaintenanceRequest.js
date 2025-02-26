import mongoose from "mongoose";

const maintenanceRequestSchema = new mongoose.Schema(
  {
    issue: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    assignedTo: {
      type: String,
      default: "Unassigned",
    },
  },
  { timestamps: true }
);

const MaintenanceRequest = mongoose.model(
  "maintenanceRequesr",
  maintenanceRequestSchema
);

export default MaintenanceRequest;
