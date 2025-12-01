import express from 'express';
import { getAttendance, markAttendance, getAttendanceReport } from '../controllers/attendanceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, markAttendance);
router.route('/report').get(protect, getAttendanceReport);
router.route('/:date').get(protect, getAttendance);

export default router;
