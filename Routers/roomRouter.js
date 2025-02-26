import express from "express";

import { assignRoom, checkOutResident, createRoom, getRooms } from "../controllers/roomController.js";

const router = express.Router();

router.post("/create-rooms",createRoom)
router.get("/rooms",getRooms)
router.post("/assign",assignRoom)
router.post("/checkout",checkOutResident)


export default router;
