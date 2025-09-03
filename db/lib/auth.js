import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import connectDB from './mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticateAdmin = async (request) => {
    try {
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return { error: 'Access denied. No token provided.' };
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        await connectDB();
        const admin = await Admin.findById(decoded.id).select('-password');

        if (!admin || !admin.isActive) {
            return { error: 'Invalid token or admin not active.' };
        }

        return { admin };
    } catch (error) {
        return { error: 'Invalid token.' };
    }
};

export const generateToken = (adminId) => {
    return jwt.sign({ id: adminId }, JWT_SECRET, { expiresIn: '24h' });
};