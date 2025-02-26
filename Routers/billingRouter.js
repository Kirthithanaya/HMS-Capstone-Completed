import express from "express";
import { createInvoice, getInvoices } from "../controllers/billingController.js";



const router = express.Router();


router.post("/create",createInvoice)
router.get("/invoices",getInvoices)


export default router;