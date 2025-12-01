import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';

// @desc    Get attendance for a specific date
// @route   GET /api/attendance/:date
// @access  Private
export const getAttendance = async (req, res) => {
    try {
        const date = new Date(req.params.date);
        // Normalize date to start of day to avoid time mismatches
        date.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOne({ date }).populate('records.student', 'name email mobile department course');

        if (attendance) {
            res.json(attendance);
        } else {
            res.json(null); // No record found for this date
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark or update attendance
// @route   POST /api/attendance
// @access  Private
export const markAttendance = async (req, res) => {
    const { date, records } = req.body;

    try {
        const attendanceDate = new Date(date);
        attendanceDate.setHours(0, 0, 0, 0);

        // Check if attendance already exists for this date
        let attendance = await Attendance.findOne({ date: attendanceDate });

        if (attendance) {
            // Update existing record
            attendance.records = records;
            const updatedAttendance = await attendance.save();
            res.json(updatedAttendance);
        } else {
            // Create new record
            const newAttendance = await Attendance.create({
                date: attendanceDate,
                records,
            });
            res.status(201).json(newAttendance);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get attendance report between dates
// @route   GET /api/attendance/report
// @access  Private
export const getAttendanceReport = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        const attendanceRecords = await Attendance.find({
            date: { $gte: start, $lte: end }
        }).populate('records.student', 'name department');

        const report = {};

        // Initialize report for all students (optional: fetch all students first to ensure 0s for those with no attendance)
        const students = await Student.find({});
        students.forEach(student => {
            report[student._id] = {
                id: student._id,
                name: student.name,
                department: student.department,
                present: 0,
                absent: 0,
                total: 0
            };
        });

        attendanceRecords.forEach(record => {
            record.records.forEach(entry => {
                if (report[entry.student._id]) {
                    if (entry.status === 'Present') {
                        report[entry.student._id].present++;
                    } else {
                        report[entry.student._id].absent++;
                    }
                    report[entry.student._id].total++;
                }
            });
        });

        res.json(Object.values(report));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
