import express from "express";

import { createResident, deleteResident, getResidents, updateResident } from "../controllers/roomController.js";

const router = express.Router();


router.post("/create",createResident)
router.get("/residents",getResidents)
router.put("/update/:id",updateResident)
router.delete("/delete/:id",deleteResident)



export default router;