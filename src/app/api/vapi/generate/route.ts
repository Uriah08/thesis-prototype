import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json({ message: "Hello from VAPI" }, { status: 200 });
    } catch (error) {
        console.error("Error in GET /api/vapi/generate:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}