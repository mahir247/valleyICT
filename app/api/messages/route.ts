export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/app/lib/models/schema";
import connectToDatabase from "@/app/lib/mongodb";
import { requireAuth } from "@/app/lib/auth";

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        const messages = await Message.find();
        return NextResponse.json(
            { success: true, messages },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, error: 'Something went wrong' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const { name, email, message } = body;
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        return NextResponse.json(
            { success: true, message: 'Message sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { success: false, error: 'Something went wrong' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        // Require authentication
        try {
            requireAuth(request);
        } catch (e) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const _id = searchParams.get('_id');
        if (!_id) {
            return NextResponse.json(
                { success: false, error: 'Message not found' },
                { status: 404 }
            );
        }
        const message = await Message.findByIdAndDelete(_id);
        return NextResponse.json({ success: true, message: 'Message deleted successfully' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}