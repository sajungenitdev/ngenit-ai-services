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

        const total = await Contact.countDocuments();
        const pending = await Contact.countDocuments({ status: "pending" });
        const contacted = await Contact.countDocuments({ status: "contacted" });
        const completed = await Contact.countDocuments({ status: "completed" });

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recent = await Contact.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        const recentContacts = await Contact.find()
            .sort({ createdAt: -1 })
            .limit(10);

        return NextResponse.json({
            success: true,
            data: {
                stats: { total, pending, contacted, completed, recent },
                recentContacts,
            },
        });

    } catch (error) {
        console.error("Stats API Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}