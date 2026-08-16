import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Contact } from "@/lib/models/Contact";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("admin_token")?.value;
        if (!token || !verifyToken(token)) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        await dbConnect();

        const contacts = await Contact.find()
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: contacts,
        });

    } catch (error) {
        console.error("Contacts API Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}