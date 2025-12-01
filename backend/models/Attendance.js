import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true, // One record per day
    },
    records: [
        {
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                required: true,
            },
            status: {
                type: String,
                enum: ['Present', 'Absent'],
                default: 'Absent',
            },
        },
    ],
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
