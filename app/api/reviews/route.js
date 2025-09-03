import connectDB from '../../../db/lib/mongodb';
import Review from '../../../db/models/Review';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();

        // Get only approved reviews for public display
        const reviews = await Review.find({ status: 'approved' })
            .select('name rating description createdAt')
            .sort({ createdAt: -1 })
            .limit(50);

        // Calculate average rating
        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
            : 0;

        return NextResponse.json({
            reviews,
            stats: {
                totalReviews,
                averageRating: Math.round(averageRating * 10) / 10
            }
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json(
            { error: 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();
        const { name, email, phone, rating, description } = body;

        // Validation
        if (!name || !email || !rating || !description) {
            return NextResponse.json(
                { error: 'Name, email, rating, and description are required' },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { error: 'Rating must be between 1 and 5' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Check if user already submitted a review (optional)
        const existingReview = await Review.findOne({ email });
        if (existingReview) {
            return NextResponse.json(
                { error: 'You have already submitted a review with this email' },
                { status: 400 }
            );
        }

        const review = new Review({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone?.trim() || '',
            rating: parseInt(rating),
            description: description.trim(),
            status: 'pending'
        });

        await review.save();

        return NextResponse.json(
            {
                message: 'Review submitted successfully! It will be published after admin approval.',
                reviewId: review._id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating review:', error);
        return NextResponse.json(
            { error: 'Failed to submit review' },
            { status: 500 }
        );
    }
}