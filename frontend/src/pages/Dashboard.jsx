import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-secondary-50">
            <Navbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0 animate-fade-in">
                    <div className="card mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-3xl font-bold text-secondary-900">Dashboard</h1>
                            <Link to="/add-student" className="btn-primary">
                                Add New Student
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-primary-50 p-6 rounded-xl border border-primary-100 transition-transform hover:-translate-y-1 duration-300">
                                <h3 className="text-lg font-semibold text-primary-800">Welcome Back!</h3>
                                <p className="text-primary-600 mt-2">Manage your students efficiently from this admin panel.</p>
                            </div>
                            <div className="card hover:shadow-md border-secondary-200">
                                <h3 className="text-lg font-semibold text-secondary-800">Quick Actions</h3>
                                <div className="mt-4 flex flex-col space-y-2">
                                    <Link to="/students" className="text-primary-600 hover:text-primary-800 font-medium transition-colors">
                                        View All Students &rarr;
                                    </Link>
                                    <Link to="/add-student" className="text-primary-600 hover:text-primary-800 font-medium transition-colors">
                                        Create New Profile &rarr;
                                    </Link>
                                </div>
                            </div>
                            <div className="card hover:shadow-md border-secondary-200">
                                <h3 className="text-lg font-semibold text-secondary-800">System Status</h3>
                                <div className="mt-4 flex items-center">
                                    <span className="h-3 w-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                    <span className="text-secondary-600">System Online</span>
                                </div>
                                <p className="text-sm text-secondary-500 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
