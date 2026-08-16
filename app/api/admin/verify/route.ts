import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
        return NextResponse.json(
            { success: false, error: "Invalid token" },
            { status: 401 }
        );
    }

    return NextResponse.json({ 
        success: true, 
        data: { user: decoded }
    });
}