export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { Enrollment } from "@/app/lib/models/schema";
import connectToDatabase from "@/app/lib/mongodb";
import { uploadToCloudinary } from "@/app/lib/cloudinary";
import { requireAuth } from "@/app/lib/auth";

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        const enrollments = await Enrollment.find().sort({ createdAt: -1 });
        return NextResponse.json(
            { success: true, enrollments },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        return NextResponse.json(
            { success: false, error: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        
        const formData = await request.formData();
        
        const name = formData.get("name") as string;
        const phone = formData.get("phone") as string;
        const email = formData.get("email") as string | null;
        const photo = formData.get("photo") as File;
        const nidPhoto = formData.get("nidPhoto") as File;

        // Validate required fields
        if (!name || !phone || !photo || !nidPhoto) {
            return NextResponse.json(
                { success: false, error: "সব প্রয়োজনীয় তথ্য প্রদান করুন" },
                { status: 400 }
            );
        }

        // Validate file types
        if (!photo.type.startsWith("image/") || !nidPhoto.type.startsWith("image/")) {
            return NextResponse.json(
                { success: false, error: "শুধুমাত্র ছবি ফাইল আপলোড করা যাবে" },
                { status: 400 }
            );
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (photo.size > maxSize || nidPhoto.size > maxSize) {
            return NextResponse.json(
                { success: false, error: "ছবির সাইজ ৫MB এর বেশি হতে পারবে না" },
                { status: 400 }
            );
        }

        // Upload photos to Cloudinary
        let photoUrl: string;
        let nidPhotoUrl: string;

        try {
            [photoUrl, nidPhotoUrl] = await Promise.all([
                uploadToCloudinary(photo),
                uploadToCloudinary(nidPhoto),
            ]);
        } catch (uploadError) {
            console.error("Cloudinary upload error:", uploadError);
            return NextResponse.json(
                { success: false, error: "ছবি আপলোড করতে সমস্যা হয়েছে" },
                { status: 500 }
            );
        }

        // Save to database
        const newEnrollment = new Enrollment({
            name,
            phone,
            email: email || undefined,
            photo: photoUrl,
            nidPhoto: nidPhotoUrl,
            status: "pending",
        });

        await newEnrollment.save();

        return NextResponse.json(
            {
                success: true,
                message: "আপনার তথ্য সফলভাবে জমা হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
                enrollment: newEnrollment,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating enrollment:", error);
        return NextResponse.json(
            { success: false, error: "Something went wrong" },
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
        const _id = searchParams.get("_id");
        
        if (!_id) {
            return NextResponse.json(
                { success: false, error: "Enrollment ID is required" },
                { status: 400 }
            );
        }

        const enrollment = await Enrollment.findByIdAndDelete(_id);
        
        if (!enrollment) {
            return NextResponse.json(
                { success: false, error: "Enrollment not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Enrollment deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting enrollment:", error);
        return NextResponse.json(
            { success: false, error: "Something went wrong" },
            { status: 500 }
        );
    }
}

