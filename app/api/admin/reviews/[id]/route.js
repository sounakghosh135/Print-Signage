import connectDB from '../../../../../db/lib/mongodb';
import Review from '../../../../../db/models/Review';
import { authenticateAdmin } from '../../../../../db/lib/auth';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
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

        const { id } = params;
        const body = await request.json();
        const { action } = body;

        if (!['approve', 'reject'].includes(action)) {
            return NextResponse.json(
                { error: 'Invalid action' },
                { status: 400 }
            );
        }

        const review = await Review.findById(id);
        if (!review) {
            return NextResponse.json(
                { error: 'Review not found' },
                { status: 404 }
            );
        }

        const updateData = {
            status: action === 'approve' ? 'approved' : 'rejected',
            approvedBy: authResult.admin._id,
            approvedAt: new Date()
        };

        const updatedReview = await Review.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate('approvedBy', 'username');

        return NextResponse.json({
            message: `Review ${action}d successfully`,
            review: updatedReview
        });
    } catch (error) {
        console.error('Error updating review:', error);
        return NextResponse.json(
            { error: 'Failed to update review' },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
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

        const { id } = params;

        const review = await Review.findById(id);
        if (!review) {
            return NextResponse.json(
                { error: 'Review not found' },
                { status: 404 }
            );
        }

        await Review.findByIdAndDelete(id);

        return NextResponse.json({
            message: 'Review deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting review:', error);
        return NextResponse.json(
            { error: 'Failed to delete review' },
            { status: 500 }
        );
    }
}