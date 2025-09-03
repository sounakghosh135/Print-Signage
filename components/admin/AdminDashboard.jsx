'use client'

import { useState, useEffect } from 'react';

const AdminDashboard = ({ admin, onLogout }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusCounts, setStatusCounts] = useState({
        pending: 0,
        approved: 0,
        rejected: 0
    });
    const [currentFilter, setCurrentFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [actionLoading, setActionLoading] = useState({});

    useEffect(() => {
        fetchReviews();
    }, [currentFilter, currentPage]);

    const fetchReviews = async () => {
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
            const response = await fetch(
                `/api/admin/reviews?status=${currentFilter}&page=${currentPage}&limit=10`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                setReviews(data.reviews);
                setStatusCounts(data.statusCounts);
                setPagination(data.pagination);
            } else if (response.status === 401) {
                onLogout();
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReviewAction = async (reviewId, action) => {
        setActionLoading({ ...actionLoading, [reviewId]: true });

        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
            const response = await fetch(`/api/admin/reviews/${reviewId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ action })
            });

            if (response.ok) {
                fetchReviews(); // Refresh the list
            } else if (response.status === 401) {
                onLogout();
            }
        } catch (error) {
            console.error('Error updating review:', error);
        } finally {
            setActionLoading({ ...actionLoading, [reviewId]: false });
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        setActionLoading({ ...actionLoading, [reviewId]: true });

        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
            const response = await fetch(`/api/admin/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                fetchReviews(); // Refresh the list
            } else if (response.status === 401) {
                onLogout();
            }
        } catch (error) {
            console.error('Error deleting review:', error);
        } finally {
            setActionLoading({ ...actionLoading, [reviewId]: false });
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const StarDisplay = ({ rating }) => {
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`text-sm ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800'
        };
        return badges[status] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="text-gray-600">Welcome back, {admin.username}</p>
                        </div>
                        <button
                            onClick={onLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="text-2xl font-bold text-blue-600">{statusCounts.pending + statusCounts.approved + statusCounts.rejected}</div>
                        <div className="text-gray-600">Total Reviews</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
                        <div className="text-gray-600">Pending</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="text-2xl font-bold text-green-600">{statusCounts.approved}</div>
                        <div className="text-gray-600">Approved</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
                        <div className="text-gray-600">Rejected</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="flex space-x-2">
                        {['all', 'pending', 'approved', 'rejected'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => {
                                    setCurrentFilter(filter);
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-md capitalize transition-colors ${currentFilter === filter
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reviews Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium">Reviews ({pagination.totalReviews})</h2>
                    </div>

                    {reviews.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No reviews found for the selected filter.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rating
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Review
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {reviews.map((review) => (
                                        <tr key={review._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="font-medium text-gray-900">{review.name}</div>
                                                    <div className="text-sm text-gray-500">{review.email}</div>
                                                    {review.phone && (
                                                        <div className="text-sm text-gray-500">{review.phone}</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StarDisplay rating={review.rating} />
                                                <div className="text-sm text-gray-500">{review.rating}/5</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="max-w-xs overflow-hidden">
                                                    <p className="text-sm text-gray-900 line-clamp-3">
                                                        {review.description}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(review.status)}`}>
                                                    {review.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(review.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    {review.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleReviewAction(review._id, 'approve')}
                                                                disabled={actionLoading[review._id]}
                                                                className="text-green-600 hover:text-green-900 disabled:opacity-50"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleReviewAction(review._id, 'reject')}
                                                                disabled={actionLoading[review._id]}
                                                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteReview(review._id)}
                                                        disabled={actionLoading[review._id]}
                                                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
                            <div className="text-sm text-gray-700">
                                Showing page {pagination.currentPage} of {pagination.totalPages}
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
                                    disabled={currentPage === pagination.totalPages}
                                    className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;