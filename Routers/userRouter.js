import express from "express";
import { deleteUser, getAllUsers, updateUserRole } from "../controllers/authController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect,authorize(["Admin"]), getAllUsers);
router.put("/:id/role",protect, authorize(["Admin"]), updateUserRole);
router.delete("/:id/delete", protect, authorize(["Admin"]), deleteUser);

export default router;