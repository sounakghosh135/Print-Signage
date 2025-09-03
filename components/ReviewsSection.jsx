'use client'

import { useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewsDisplay from './ReviewsDisplay';

const ReviewsSection = ({
    className = '',
    showHeader = true,
    headerTitle = 'Customer Reviews',
    headerSubtitle = 'Share your experience and read what others have to say',
    showGuidelines = true,
    backgroundColor = 'bg-gray-50'
}) => {
    const [refreshReviews, setRefreshReviews] = useState(0);

    const handleSubmitSuccess = () => {
        // This could trigger a refresh of the reviews display if needed
        // For now, we'll just show a success message since reviews need approval
        console.log('Review submitted successfully');
        // Optionally trigger a refresh after some delay
        // setTimeout(() => setRefreshReviews(prev => prev + 1), 1000);
    };

    return (
        <section className={`${backgroundColor} py-12 ${className}`} id="reviews">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                {showHeader && (
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            {headerTitle}
                        </h2>
                        <p className="text-lg text-gray-600">
                            {headerSubtitle}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Review Form */}
                    <div className="flex flex-col">
                        <ReviewForm onSubmitSuccess={handleSubmitSuccess} />
                    </div>

                    {/* Reviews Display */}
                    <div className="flex flex-col">
                        <ReviewsDisplay key={refreshReviews} />
                    </div>
                </div>

                {/* Guidelines */}
                {showGuidelines && (
                    <div className="mt-16 bg-blue-50 rounded-lg p-8">
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                                Review Guidelines
                            </h3>
                            <div className="max-w-2xl mx-auto text-blue-800">
                                <ul className="space-y-2 text-left">
                                    <li>• Reviews are moderated and will be published after approval</li>
                                    <li>• Please be honest and constructive in your feedback</li>
                                    <li>• Include specific details about your experience</li>
                                    <li>• Offensive or inappropriate content will not be published</li>
                                    <li>• One review per email address is allowed</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ReviewsSection;