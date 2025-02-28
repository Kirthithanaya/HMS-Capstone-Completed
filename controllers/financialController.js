import FinancialReport from "../models/FinancialReport.js";

// @desc   Generate Financial Report
// @route  POST /api/financial
// @access Private (Admin Only)
const generateReport = async (req, res) => {
  try {
    const { revenue, expenses, occupancyRate } = req.body;
    const profit = revenue - expenses;

    const report = await FinancialReport.create({
      revenue,
      expenses,
      profit,
      occupancyRate,
      user: req.user._id
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get All Financial Reports
// @route  GET /api/financial
// @access Private
const getAllReports = async (req, res) => {
  try {
    const reports = await FinancialReport.find().populate("user", "name email");
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get Single Financial Report
// @route  GET /api/financial/:id
// @access Private
const getReportById = async (req, res) => {
  try {
    const report = await FinancialReport.findById(req.params.id).populate("user", "name email");
    if (!report) return res.status(404).json({ message: "Report not found" });

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Update Financial Report
// @route  PUT /api/financial/:id
// @access Private (Admin Only)
const updateReport = async (req, res) => {
  try {
    const { revenue, expenses, occupancyRate } = req.body;
    const profit = revenue - expenses;

    const updatedReport = await FinancialReport.findByIdAndUpdate(
      req.params.id,
      { revenue, expenses, profit, occupancyRate },
      { new: true }
    );

    if (!updatedReport) return res.status(404).json({ message: "Report not found" });

    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Delete Financial Report
// @route  DELETE /api/financial/:id
// @access Private (Admin Only)
const deleteReport = async (req, res) => {
  try {
    const report = await FinancialReport.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    res.status(200).json({ message: "Financial report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { generateReport, getAllReports, getReportById, updateReport, deleteReport };
