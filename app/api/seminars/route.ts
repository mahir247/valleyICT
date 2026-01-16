export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { Seminar } from "@/app/lib/models/schema";
import connectToDatabase from "@/app/lib/mongodb";
import { requireAuth } from '@/app/lib/auth';


export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        const seminars = await Seminar.find();
        return NextResponse.json({ success: true, data : seminars }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        // Require authentication
        try {
            requireAuth(request);
        } catch (e) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const body = await request.json();
        const { seminars } = body;
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        // Check if id exists and is valid (not empty and valid ObjectId format)
        if (id && id.trim() !== "" && /^[0-9a-fA-F]{24}$/.test(id)) {
            try {
                const seminar = await Seminar.findById(id);
                if (seminar && seminar._id) {
                    const res = await Seminar.findByIdAndUpdate(seminar._id, { seminars });
                    return NextResponse.json({ success: true, seminar: res }, { status: 200 });
                }
            } catch (error) {
                // If findById fails, continue to create new seminar
                console.log('Error finding seminar:', error);
            }
        }

        // Create new seminar if id is not provided or invalid
        const newSeminar = new Seminar({ seminars });
        await newSeminar.save();
        return NextResponse.json({ success: true, seminar: newSeminar }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}