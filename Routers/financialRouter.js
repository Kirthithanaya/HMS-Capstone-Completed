import express from "express";
import {
  deleteReport,
  generateReport,
  getAllReports,
  getReportById,
  updateReport,
} from "../controllers/financialController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, generateReport);
router.get("/reports/:id", getReportById);
router.get("/reports", protect, getAllReports);
router.put("/update/:id", protect, updateReport);
router.delete("/delete/:id", protect, deleteReport);

export default router;
