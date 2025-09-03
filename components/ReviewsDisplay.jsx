'use client'

import { useState, useEffect } from 'react';

const ReviewsDisplay = () => {
    const [reviews, setReviews] = useState([]);
    const [stats, setStats] = useState({ totalReviews: 0, averageRating: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch('/api/reviews');
            const data = await response.json();

            if (response.ok) {
                setReviews(data.reviews);
                setStats(data.stats);
            } else {
                setError('Failed to load reviews');
            }
        } catch (error) {
            setError('Something went wrong while loading reviews');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const StarDisplay = ({ rating, size = 'text-lg' }) => {
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`${size} ${star <= rating
                                ? 'text-amber-400 drop-shadow-sm'
                                : 'text-gray-300'
                            } transition-all duration-200`}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    const LoadingSkeleton = () => (
        <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="space-y-2">
                            <div className="h-5 bg-gray-200 rounded-md w-32"></div>
                            <div className="h-4 bg-gray-200 rounded-md w-24"></div>
                        </div>
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <div key={star} className="h-5 w-5 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const EmptyState = () => (
        <div className="text-center p-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200">
            <div className="mx-auto w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Reviews Yet</h3>
            <p className="text-gray-600 max-w-sm mx-auto">
                Be the first to share your experience! Your review helps others make informed decisions.
            </p>
        </div>
    );

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-8">
                    <div className="text-center animate-pulse">
                        <div className="h-8 bg-gray-200 rounded-md w-48 mx-auto mb-4"></div>
                        <div className="flex justify-center items-center space-x-4 mb-2">
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div key={star} className="h-6 w-6 bg-gray-200 rounded"></div>
                                ))}
                            </div>
                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                    </div>
                </div>
                <LoadingSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="text-center p-8 text-red-700 bg-red-50 rounded-2xl border border-red-200 shadow-sm">
                    <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Oops! Something went wrong</h3>
                    <p>{error}</p>
                    <button
                        onClick={fetchReviews}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Enhanced Stats Section */}
            {stats.totalReviews > 0 && (
                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 mb-8 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-100 to-yellow-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

                    <div className="text-center relative z-10">
                        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>Customer Reviews</span>
                        </div>

                        <div className="flex justify-center items-center space-x-6 mb-4">
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <StarDisplay rating={Math.round(stats.averageRating)} size="text-2xl" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    {stats.averageRating}
                                </div>
                                <div className="text-sm text-gray-500 font-medium">
                                    Average Rating
                                </div>
                            </div>

                            <div className="h-16 w-px bg-gray-200"></div>

                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-1">
                                    {stats.totalReviews}
                                </div>
                                <div className="text-sm text-gray-500 font-medium">
                                    Total Review{stats.totalReviews !== 1 ? 's' : ''}
                                </div>
                            </div>
                        </div>

                        {/* Rating distribution could go here */}
                        <div className="flex justify-center">
                            <div className="inline-flex items-center space-x-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Verified Reviews</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews List */}
            {reviews.length === 0 ? (
                <EmptyState />
            ) : (
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Recent Reviews ({reviews.length})
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                            </svg>
                            <span>Sorted by newest</span>
                        </div>
                    </div>

                    {/* Scrollable Reviews Container */}
                    <div className="relative max-w-xs md:max-w-md">
                        <div className="max-h-110 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                            {reviews.map((review, index) => (
                                <div
                                    key={review._id}
                                    className="group bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        animation: 'fadeInUp 0.6s ease-out forwards'
                                    }}
                                >
                                    <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
                                        <div className="flex items-start space-x-4">
                                            {/* Avatar */}
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                                                {review.name.charAt(0).toUpperCase()}
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    {review.name}
                                                </h4>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <p className="text-gray-500 text-sm">
                                                        {formatDate(review.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Rating with background */}
                                        <div className="bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 flex justify-between items-center md:gap-2">
                                            <StarDisplay rating={review.rating} size="text-base" />
                                            <div className="text-center">
                                                <span className="text-xs font-medium text-gray-600">
                                                    {review.rating}/5
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review content */}
                                    <div className="relative">
                                        <div className="absolute top-0 left-0 w-8 h-6 text-gray-200 text-4xl font-serif leading-none">
                                            "
                                        </div>
                                        <p className="text-gray-700 leading-relaxed pl-6 italic group-hover:text-gray-900 transition-colors">
                                            {review.description}
                                        </p>
                                        <div className="absolute bottom-0 right-0 w-8 h-6 text-gray-200 text-4xl font-serif leading-none transform rotate-180">
                                            "
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Scroll indicator */}
                        {reviews.length > 2 && (
                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none flex items-end justify-center pb-2">
                                <div className="flex items-center space-x-1 text-xs text-gray-400 bg-white px-2 py-1 rounded-full shadow-sm">
                                    <svg className="w-3 h-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                    <span>Scroll for more</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Load more button if you implement pagination later */}
            {reviews.length >= 10 && (
                <div className="text-center mt-8">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                        Load More Reviews
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReviewsDisplay;