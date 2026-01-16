export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/mongodb';
import { Certificate } from '@/app/lib/models/schema';
import { uploadToCloudinary } from '@/app/lib/cloudinary';
import { requireAuth } from '@/app/lib/auth';

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        const certificates = await Certificate.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, certificates }, { status: 200 });
    } catch (error) {
        console.error('Error fetching certificates:', error);
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

        const formData = await request.formData();
        const name = formData.get('name') as string;
        const registrationNumber = formData.get('registrationNumber') as string;
        const roll = formData.get('roll') as string;
        const studentImageFile = formData.get('studentImage') as File | null;
        const studentImageUrl = (formData.get('studentImageUrl') as string) || '';
        const certificateFile = formData.get('certificate') as File | null;

        if (!name || !registrationNumber || !roll || !certificateFile) {
            return NextResponse.json({ success: false, error: 'সব প্রয়োজনীয় তথ্য প্রদান করুন' }, { status: 400 });
        }

        if (!studentImageFile && !studentImageUrl) {
            return NextResponse.json({ success: false, error: 'ছাত্রের ছবি আপলোড করুন' }, { status: 400 });
        }

        // Validate certificate file
        if (!certificateFile.type.startsWith('image/')) {
            return NextResponse.json({ success: false, error: 'শুধুমাত্র ছবি ফাইল আপলোড করা যাবে' }, { status: 400 });
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (certificateFile.size > maxSize) {
            return NextResponse.json({ success: false, error: 'ছবির সাইজ ৫MB এর বেশি হতে পারবে না' }, { status: 400 });
        }

        // Upload certificate to Cloudinary
        let certUrl: string;
        try {
            certUrl = await uploadToCloudinary(certificateFile, 'certificates');
        } catch (uploadError) {
            console.error('Cloudinary upload error:', uploadError);
            return NextResponse.json({ success: false, error: 'সার্টিফিকেট ছবি আপলোড করতে সমস্যা হয়েছে' }, { status: 500 });
        }

        // Upload student image to Cloudinary if file provided
        let finalStudentImageUrl = studentImageUrl;
        if (studentImageFile) {
            // Validate student image file
            if (!studentImageFile.type.startsWith('image/')) {
                return NextResponse.json({ success: false, error: 'শুধুমাত্র ছবি ফাইল আপলোড করা যাবে' }, { status: 400 });
            }
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (studentImageFile.size > maxSize) {
                return NextResponse.json({ success: false, error: 'ছবির সাইজ ৫MB এর বেশি হতে পারবে না' }, { status: 400 });
            }

            try {
                finalStudentImageUrl = await uploadToCloudinary(studentImageFile, 'certificates/students');
            } catch (uploadError) {
                console.error('Cloudinary upload error:', uploadError);
                return NextResponse.json({ success: false, error: 'ছাত্রের ছবি আপলোড করতে সমস্যা হয়েছে' }, { status: 500 });
            }
        }

        // Save to DB
        const newCert = new Certificate({
            name,
            registrationNumber,
            roll,
            studentImageUrl: finalStudentImageUrl || undefined,
            certificateImageUrl: certUrl,
        });

        await newCert.save();

        return NextResponse.json({ success: true, certificate: newCert }, { status: 201 });
    } catch (error) {
        console.error('Error creating certificate:', error);
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        await connectToDatabase();

        const formData = await request.formData();
        const id = formData.get('id') as string;
        const name = formData.get('name') as string;
        const registrationNumber = formData.get('registrationNumber') as string;
        const roll = formData.get('roll') as string;
        const studentImageFile = formData.get('studentImage') as File | null;
        const studentImageUrl = (formData.get('studentImageUrl') as string) || '';
        const certificateFile = formData.get('certificate') as File | null;

        if (!id || !name || !registrationNumber || !roll) {
            return NextResponse.json({ success: false, error: 'সব প্রয়োজনীয় তথ্য প্রদান করুন' }, { status: 400 });
        }

        const cert = await Certificate.findById(id);
        if (!cert) {
            return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
        }

        // If new certificate uploaded, validate and upload
        if (certificateFile) {
            if (!certificateFile.type.startsWith('image/')) {
                return NextResponse.json({ success: false, error: 'শুধুমাত্র ছবি ফাইল আপলোড করা যাবে' }, { status: 400 });
            }
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (certificateFile.size > maxSize) {
                return NextResponse.json({ success: false, error: 'ছবির সাইজ ৫MB এর বেশি হতে পারবে না' }, { status: 400 });
            }

            try {
                const certUrl = await uploadToCloudinary(certificateFile, 'certificates');
                cert.certificateImageUrl = certUrl;
            } catch (uploadError) {
                console.error('Cloudinary upload error:', uploadError);
                return NextResponse.json({ success: false, error: 'সার্টিফিকেট ছবি আপলোড করতে সমস্যা হয়েছে' }, { status: 500 });
            }
        }

        // If new student image uploaded, validate and upload
        if (studentImageFile) {
            if (!studentImageFile.type.startsWith('image/')) {
                return NextResponse.json({ success: false, error: 'শুধুমাত্র ছবি ফাইল আপলোড করা যাবে' }, { status: 400 });
            }
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (studentImageFile.size > maxSize) {
                return NextResponse.json({ success: false, error: 'ছবির সাইজ ৫MB এর বেশি হতে পারবে না' }, { status: 400 });
            }

            try {
                const studentUrl = await uploadToCloudinary(studentImageFile, 'certificates/students');
                cert.studentImageUrl = studentUrl;
            } catch (uploadError) {
                console.error('Cloudinary upload error:', uploadError);
                return NextResponse.json({ success: false, error: 'ছাত্রের ছবি আপলোড করতে সমস্যা হয়েছে' }, { status: 500 });
            }
        } else if (studentImageUrl) {
            // Keep existing URL if provided
            cert.studentImageUrl = studentImageUrl;
        }

        cert.name = name;
        cert.registrationNumber = registrationNumber;
        cert.roll = roll;

        await cert.save();

        return NextResponse.json({ success: true, certificate: cert }, { status: 200 });
    } catch (error) {
        console.error('Error updating certificate:', error);
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
            return NextResponse.json({ success: false, error: 'Certificate ID is required' }, { status: 400 });
        }

        const cert = await Certificate.findByIdAndDelete(id);

        if (!cert) {
            return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Certificate deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting certificate:', error);
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
    }
}
