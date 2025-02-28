import express from 'express';
import { registerAdmin, loginAdmin, getAllRooms, deleteRoom } from '../controllers/adminController.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/rooms', getAllRooms);
router.delete('/rooms/:id', deleteRoom);

export default router;
