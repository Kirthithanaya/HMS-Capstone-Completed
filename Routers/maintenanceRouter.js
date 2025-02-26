import express from "express";
import { createRequest, getRequests, updateRequestStatus } from "../controllers/maintenanceController.js";



const router = express.Router();

router.get("/requests",getRequests)
router.post("/create",createRequest)
router.patch("/update/:id",updateRequestStatus)

export default router;