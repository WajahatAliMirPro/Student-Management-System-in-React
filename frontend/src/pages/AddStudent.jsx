import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        department: 'Computer Science',
        gender: 'Male',
        course: 'MCA',
        image: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post('/students', formData);
            navigate('/students');
        } catch (error) {
            console.error('Error adding student:', error);
            alert(error.response?.data?.message || 'Error adding student');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary-50">
            <Navbar />
            <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8 animate-fade-in">
                <div className="card overflow-hidden">
                    <div className="px-6 py-4 bg-primary-50 border-b border-primary-100">
                        <h2 className="text-xl font-bold text-primary-900">Create New Student</h2>
                        <p className="text-sm text-primary-600 mt-1">Fill in the details to add a new student to the system.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input-field"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input-field"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-1">Mobile Number</label>
                                <input
                                    type="text"
                                    name="mobile"
                                    className="input-field"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                    placeholder="+1 234 567 890"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-1">Department</label>
                                <select
                                    name="department"
                                    className="input-field"
                                    value={formData.department}
                                    onChange={handleChange}
                                >
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Electrical Engineering">Electrical Engineering</option>
                                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                                    <option value="Business Administration">Business Administration</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Gender</label>
                                <div className="flex gap-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            checked={formData.gender === 'Male'}
                                            onChange={handleChange}
                                            className="form-radio h-4 w-4 text-primary-600 border-secondary-300 focus:ring-primary-500"
                                        />
                                        <span className="ml-2 text-secondary-700">Male</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            checked={formData.gender === 'Female'}
                                            onChange={handleChange}
                                            className="form-radio h-4 w-4 text-primary-600 border-secondary-300 focus:ring-primary-500"
                                        />
                                        <span className="ml-2 text-secondary-700">Female</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Course</label>
                                <div className="flex gap-4">
                                    {['MCA', 'BCA', 'BSC', 'B.Tech'].map((course) => (
                                        <label key={course} className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="course"
                                                value={course}
                                                checked={formData.course === course}
                                                onChange={handleChange}
                                                className="form-radio h-4 w-4 text-primary-600 border-secondary-300 focus:ring-primary-500"
                                            />
                                            <span className="ml-2 text-secondary-700">{course}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-1">Profile Image URL</label>
                            <input
                                type="text"
                                name="image"
                                className="input-field"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                            />
                            <p className="mt-1 text-xs text-secondary-500">Provide a direct link to the image file.</p>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-secondary-100">
                            <button
                                type="button"
                                onClick={() => navigate('/students')}
                                className="btn-secondary mr-3"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn-primary"
                            >
                                {isLoading ? 'Creating...' : 'Create Student'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddStudent;
