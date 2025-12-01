import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';

const Attendance = () => {
    const [students, setStudents] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendance, setAttendance] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchStudentsAndAttendance();
    }, [date]);

    const fetchStudentsAndAttendance = async () => {
        setIsLoading(true);
        try {
            // Fetch all students
            const studentsRes = await api.get('/students');
            setStudents(studentsRes.data);

            // Fetch attendance for the selected date
            const attendanceRes = await api.get(`/attendance/${date}`);

            const newAttendance = {};
            if (attendanceRes.data) {
                // If record exists, map it
                attendanceRes.data.records.forEach(record => {
                    newAttendance[record.student._id] = record.status === 'Present';
                });
            } else {
                // Default to false (Absent)
                studentsRes.data.forEach(student => {
                    newAttendance[student._id] = false;
                });
            }
            setAttendance(newAttendance);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Error loading data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckboxChange = (studentId) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: !prev[studentId]
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const records = students.map(student => ({
                student: student._id,
                status: attendance[student._id] ? 'Present' : 'Absent'
            }));

            await api.post('/attendance', {
                date,
                records
            });
            alert('Attendance saved successfully!');
        } catch (error) {
            console.error('Error saving attendance:', error);
            alert('Error saving attendance');
        } finally {
            setIsSaving(false);
        }
    };

    const handleMarkAll = (status) => {
        const newAttendance = {};
        students.forEach(student => {
            newAttendance[student._id] = status;
        });
        setAttendance(newAttendance);
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 animate-fade-in">
                <div className="px-4 sm:px-0 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-100">Attendance</h1>
                        <p className="mt-1 text-sm text-gray-300">Manage daily attendance for your students.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="input-field"
                        />
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="btn-primary whitespace-nowrap"
                        >
                            {isSaving ? 'Saving...' : 'Save Attendance'}
                        </button>
                    </div>
                </div>

                <div className="card overflow-hidden">
                    {isLoading ? (
                        <div className="p-8 text-center text-gray-300">Loading...</div>
                    ) : students.length === 0 ? (
                        <div className="p-8 text-center text-gray-300">No students found.</div>
                    ) : (
                        <div className="overflow-x-auto table-container">
                            <div className="p-4 border-b border-[#31c3c433] flex gap-2">
                                <button onClick={() => handleMarkAll(true)} className="text-sm text-[#31c3c4] hover:text-[#5bf6e8] font-medium bg-transparent shadow-none">Mark All Present</button>
                                <span className="text-gray-500">|</span>
                                <button onClick={() => handleMarkAll(false)} className="text-sm text-[#31c3c4] hover:text-[#5bf6e8] font-medium bg-transparent shadow-none">Mark All Absent</button>
                            </div>
                            <table className="min-w-full divide-y divide-[#31c3c433]">
                                <thead className="bg-[#19203d]">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#31c3c4] uppercase tracking-wider">
                                            Student
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#31c3c4] uppercase tracking-wider">
                                            Department
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#31c3c4] uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#31c3c433]">
                                    {students.map((student) => (
                                        <tr key={student._id} className="hover:bg-[#27375b] transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        {student.image ? (
                                                            <img className="h-10 w-10 rounded-full object-cover" src={student.image} alt="" />
                                                        ) : (
                                                            <div className="h-10 w-10 rounded-full bg-[#31c3c433] flex items-center justify-center text-[#31c3c4] font-bold">
                                                                {student.name.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-100">{student.name}</div>
                                                        <div className="text-sm text-gray-400">{student.course}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {student.department}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={!!attendance[student._id]}
                                                        onChange={() => handleCheckboxChange(student._id)}
                                                        className="form-checkbox h-5 w-5 text-[#31c3c4] border-gray-500 rounded focus:ring-[#31c3c4] transition duration-150 ease-in-out bg-[#1a223f]"
                                                    />
                                                    <span className={`ml-2 text-sm font-medium ${attendance[student._id] ? 'text-green-400' : 'text-red-400'}`}>
                                                        {attendance[student._id] ? 'Present' : 'Absent'}
                                                    </span>
                                                </label>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Attendance;
