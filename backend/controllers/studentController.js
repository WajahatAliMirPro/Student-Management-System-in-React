import Student from '../models/Student.js';

// @desc    Get all students
// @route   GET /api/students
// @access  Private
export const getStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private
export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new student
// @route   POST /api/students
// @access  Private
export const createStudent = async (req, res) => {
    const { name, email, mobile, department, gender, course, image } = req.body;

    try {
        const studentExists = await Student.findOne({ email });

        if (studentExists) {
            return res.status(400).json({ message: 'Student already exists' });
        }

        const student = await Student.create({
            name,
            email,
            mobile,
            department,
            gender,
            course,
            image,
        });

        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a student
// @route   PUT /api/students/:id
// @access  Private
export const updateStudent = async (req, res) => {
    const { name, email, mobile, department, gender, course, image } = req.body;

    try {
        const student = await Student.findById(req.params.id);

        if (student) {
            student.name = name || student.name;
            student.email = email || student.email;
            student.mobile = mobile || student.mobile;
            student.department = department || student.department;
            student.gender = gender || student.gender;
            student.course = course || student.course;
            student.image = image || student.image;

            const updatedStudent = await student.save();
            res.json(updatedStudent);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a student
// @route   DELETE /api/students/:id
// @access  Private
export const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (student) {
            await student.deleteOne();
            res.json({ message: 'Student removed' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
