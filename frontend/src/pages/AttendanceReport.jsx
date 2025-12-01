import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';

const AttendanceReport = () => {
    const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [report, setReport] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.get(`/attendance/report?startDate=${startDate}&endDate=${endDate}`);
            setReport(data);
        } catch (error) {
            console.error('Error fetching report:', error);
            alert('Error loading attendance report');
        } finally {
            setIsLoading(false);
        }
    };

    const calculatePercentage = (present, total) => {
        if (total === 0) return 0;
        return Math.round((present / total) * 100);
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 animate-fade-in">
                <div className="px-4 sm:px-0 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-100">Attendance Report</h1>
                        <p className="mt-1 text-sm text-gray-300">View attendance statistics for your students.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 card p-4 rounded-xl shadow-sm border border-[#31c3c466]">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-300">From:</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="input-field text-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-300">To:</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="input-field text-sm"
                            />
                        </div>
                        <button
                            onClick={fetchReport}
                            className="btn-primary text-sm px-4 py-2"
                        >
                            Generate Report
                        </button>
                    </div>
                </div>

                <div className="card overflow-hidden">
                    {isLoading ? (
                        <div className="p-8 text-center text-gray-300">Loading report...</div>
                    ) : report.length === 0 ? (
                        <div className="p-8 text-center text-gray-300">No data found for this period.</div>
                    ) : (
                        <div className="overflow-x-auto table-container">
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
                                            Present
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#31c3c4] uppercase tracking-wider">
                                            Absent
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#31c3c4] uppercase tracking-wider">
                                            Total Days
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#31c3c4] uppercase tracking-wider">
                                            Percentage
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#31c3c433]">
                                    {report.map((student) => {
                                        const percentage = calculatePercentage(student.present, student.total);
                                        let statusColor = 'text-green-400';
                                        if (percentage < 75) statusColor = 'text-yellow-400';
                                        if (percentage < 50) statusColor = 'text-red-400';

                                        return (
                                            <tr key={student.id} className="hover:bg-[#27375b] transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-100">{student.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    {student.department}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-400 font-medium">
                                                    {student.present}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-400 font-medium">
                                                    {student.absent}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-300">
                                                    {student.total}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor} bg-opacity-10`}>
                                                        {percentage}%
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AttendanceReport;
