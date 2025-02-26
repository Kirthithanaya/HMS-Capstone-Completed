import express from "express";
import { forgotPassword, getAllUsers, getProfile, loginUser, registerUser, resetPassword } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/forgot-password",forgotPassword)
router.post("/reset-password/:id/:token",resetPassword)
router.get("/profile",protect,getProfile)
router.get("/all-users",protect,getAllUsers)

export default router;