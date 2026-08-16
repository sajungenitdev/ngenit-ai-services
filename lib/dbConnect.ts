import mongoose from "mongoose";

// Use environment variable with fallback for build time
const MONGODB_URI = process.env.MONGODB_URI || "";

// Only throw error if we're actually trying to connect
// and not during build time
if (!MONGODB_URI && typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
    console.warn("⚠️ MONGODB_URI is not defined. Database features will not work.");
}

async function dbConnect() {
    if (!MONGODB_URI) {
        console.error("❌ MONGODB_URI is not defined. Cannot connect to database.");
        return null;
    }

    // Rest of the function...
    let cached = (global as any).mongoose;

    if (!cached) {
        cached = (global as any).mongoose = { conn: null, promise: null };
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then(() => mongoose.connection);
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;