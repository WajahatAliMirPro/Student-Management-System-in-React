import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL or path to image
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
