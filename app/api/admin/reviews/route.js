import connectDB from '../../../../db/lib/mongodb';
import Review from '../../../../db/models/Review';
import { authenticateAdmin } from '../../../../db/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        // Authenticate admin
        const authResult = await authenticateAdmin(request);
        if (authResult.error) {
            return NextResponse.json(
                { error: authResult.error },
                { status: 401 }
            );
        }

        await connectDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status') || 'all';
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;

        const filter = status === 'all' ? {} : { status };
        const skip = (page - 1) * limit;

        const reviews = await Review.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('approvedBy', 'username');

        const totalReviews = await Review.countDocuments(filter);
        const totalPages = Math.ceil(totalReviews / limit);

        // Get counts for each status
        const statusCounts = await Review.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const counts = {
            pending: 0,
            approved: 0,
            rejected: 0
        };

        statusCounts.forEach(item => {
            counts[item._id] = item.count;
        });

        return NextResponse.json({
            reviews,
            pagination: {
                currentPage: page,
                totalPages,
                totalReviews,
                limit
            },
            statusCounts: counts
        });
    } catch (error) {
        console.error('Error fetching admin reviews:', error);
        return NextResponse.json(
            { error: 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}