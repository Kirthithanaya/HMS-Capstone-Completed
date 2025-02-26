import express from "express";

import { createResident } from "../controllers/roomController.js";

const router = express.Router();


router.post("/create",createResident)



export default router;