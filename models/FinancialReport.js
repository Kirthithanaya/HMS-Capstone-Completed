import mongoose from "mongoose";

const financialReportSchema = new mongoose.Schema(
  {
    revenue: { type: Number, required: true },
    expenses: { type: Number, required: true },
    profit: { type: Number, required: true },
    occupancyRate: { type: Number, required: true },
    generatedAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

const FinancialReport = mongoose.model("FinancialReport", financialReportSchema);
export default FinancialReport;
