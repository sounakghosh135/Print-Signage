'use client'

import { useState, useEffect } from 'react';
import AdminLogin from '../../components/admin/AdminLogin';
import AdminDashboard from '../../components/admin/AdminDashboard';

function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if admin is already logged in
        const storedToken = localStorage.getItem('adminToken');
        const storedAdmin = localStorage.getItem('adminData');

        if (storedToken && storedAdmin) {
            try {
                const adminData = JSON.parse(storedAdmin);
                setAdmin(adminData);
                setToken(storedToken);
                setIsAuthenticated(true);
            } catch (error) {
                // Clear invalid data
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminData');
            }
        }
        setLoading(false);
    }, []);

    const handleLoginSuccess = (adminData, authToken) => {
        setAdmin(adminData);
        setToken(authToken);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        setAdmin(null);
        setToken(null);
        setIsAuthenticated(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
    }

    return <AdminDashboard admin={admin} onLogout={handleLogout} />;
}

export default AdminPage