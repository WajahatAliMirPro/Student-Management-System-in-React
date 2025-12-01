import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname === path ? 'text-white bg-primary-800 font-bold' : 'text-gray-200 hover:text-white hover:bg-primary-800/50 font-medium';
    };

    return (
        <nav className="bg-primary-900 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200">
                                Student Management System
                            </span>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link
                                    to="/"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/')}`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/students"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/students')}`}
                                >
                                    Student List
                                </Link>
                                <Link
                                    to="/attendance"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/attendance')}`}
                                >
                                    Attendance
                                </Link>
                                <Link
                                    to="/attendance-report"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/attendance-report')}`}
                                >
                                    Report
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6 gap-4">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center text-sm font-medium">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-medium text-primary-100">{user?.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-primary-200 hover:text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-800 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-primary-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/"
                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/students"
                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/students')}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Student List
                        </Link>
                        <Link
                            to="/attendance"
                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/attendance')}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Attendance
                        </Link>
                        <Link
                            to="/attendance-report"
                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/attendance-report')}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Report
                        </Link>
                    </div>
                    <div className="pt-4 pb-4 border-t border-primary-700">
                        <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-lg font-medium">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium leading-none text-white">{user?.name}</div>
                                <div className="text-sm font-medium leading-none text-primary-300 mt-1">{user?.email}</div>
                            </div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary-200 hover:text-white hover:bg-primary-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
