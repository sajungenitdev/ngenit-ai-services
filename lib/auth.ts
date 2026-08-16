import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

// Force load .env from root
dotenv.config({ path: path.join(__dirname, '../../.env') });

// IMPORTANT: Use the exact same secret from .env
const JWT_SECRET = process.env.JWT_SECRET || 'a7b63242f42967b413b22b4044ac86ef999ca49e94501c411b112211067d0ccf';

console.log('🔑 JWT_SECRET loaded:', JWT_SECRET ? '✅ Yes' : '❌ No');

export function generateToken(userId: string, email: string) {
    console.log('🔑 Generating token...');
    console.log('🔑 Using secret:', JWT_SECRET.substring(0, 10) + '...');

    return jwt.sign(
        { userId, email },
        JWT_SECRET,
        { expiresIn: "7d" }
    );
}

export function verifyToken(token: string) {
    try {
        console.log('🔑 Verifying token...');
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('✅ Token verified successfully');
        return decoded;
    } catch (error: any) {
        console.error('❌ Token verification failed:', error.message);
        return null;
    }
}

// Get admin credentials from environment variables
export function getAdminCredentials() {
    return {
        email: process.env.ADMIN_EMAIL || "admin@ngenitltd.com",
        password: process.env.ADMIN_PASSWORD || "admin123",
        name: process.env.ADMIN_NAME || "Admin",
    };
}

// Verify admin login without database
export function verifyAdminCredentials(email: string, password: string) {
    const admin = getAdminCredentials();
    return email === admin.email && password === admin.password;
}