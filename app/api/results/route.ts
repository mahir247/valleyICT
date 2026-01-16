export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/mongodb';
import { Result } from '@/app/lib/models/schema';
import { requireAuth } from '@/app/lib/auth';

export async function GET() {
    try {
        await connectToDatabase();
        const results = await Result.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, results }, { status: 200 });
    } catch (error) {
        console.error('Error fetching results:', error);
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
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
        const { name, roll, result: resText } = body;
        const certificateUrl = body.certificateUrl || body.certificate_url || '';

        if (!name || !roll || !resText) {
            return NextResponse.json({ success: false, error: 'সব প্রয়োজনীয় তথ্য প্রদান করুন' }, { status: 400 });
        }

        const newResult = new Result({
            name,
            roll,
            result: resText,
            certificate_url: certificateUrl || undefined,
        });

        await newResult.save();

        return NextResponse.json({ success: true, result: newResult }, { status: 201 });
    } catch (error) {
        console.error('Error creating result:', error);
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const { id, name, roll, result: resText } = body;
        const certificateUrl = body.certificateUrl || body.certificate_url || '';

        if (!id || !name || !roll || !resText) {
            return NextResponse.json({ success: false, error: 'সব প্রয়োজনীয় তথ্য প্রদান করুন' }, { status: 400 });
        }

        const existing = await Result.findById(id);
        if (!existing) {
            return NextResponse.json({ success: false, error: 'Result not found' }, { status: 404 });
        }

        existing.name = name;
        existing.roll = roll;
        existing.result = resText;
        existing.certificate_url = certificateUrl || existing.certificate_url;

        await existing.save();

        return NextResponse.json({ success: true, result: existing }, { status: 200 });
    } catch (error) {
        console.error('Error updating result:', error);
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
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
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'Result ID is required' }, { status: 400 });
        }

        const deleted = await Result.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ success: false, error: 'Result not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Result deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting result:', error);
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
    }
}