import { NextRequest, NextResponse } from "next/server";
import { generateToken, verifyAdminCredentials, getAdminCredentials } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        console.log('🔐 Login attempt for:', email);

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Verify credentials against environment variables
        const isValid = verifyAdminCredentials(email, password);

        if (!isValid) {
            console.log('❌ Invalid credentials for:', email);
            return NextResponse.json(
                { success: false, error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const admin = getAdminCredentials();

        // Generate JWT token
        const token = generateToken("admin-1", admin.email);
        console.log('✅ Token generated successfully:', token.substring(0, 20) + '...');

        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            token: token,
            admin: {
                id: "admin-1",
                name: admin.name,
                email: admin.email,
                role: "admin",
            },
        });

        // Set HTTP-only cookie (optional)
        response.cookies.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        });

        return response;

    } catch (error) {
        console.error("Login API Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}