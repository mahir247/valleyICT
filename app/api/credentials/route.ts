import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/app/lib/mongodb';
import Admin, { getOrCreateDefaultAdmin } from '@/app/models/admin';
import { verifyToken } from '@/app/lib/jwt';

function getTokenFromRequest(req: Request) {
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.split(' ')[1];
  const cookie = req.headers.get('cookie');
  if (!cookie) return null;
  const match = cookie.split(';').map(c => c.trim()).find(c => c.startsWith('token='));
  if (!match) return null;
  return match.split('=')[1];
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { currentUsername, currentPassword, newUsername, newPassword } = body || {};

    if (!currentUsername || !currentPassword || !newUsername || !newPassword) {
      return NextResponse.json({ success: false, error: 'সব ফিল্ড পূরণ করতে হবে' }, { status: 400 });
    }

    await connectToDatabase();

    // Ensure a default admin exists
    await getOrCreateDefaultAdmin();

    // Verify token
    const token = getTokenFromRequest(request);
    const payload = token ? verifyToken(token) : null;
    if (!payload || !payload.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const admin = await Admin.findById(payload.id);
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Make sure provided current username matches authenticated user
    if (currentUsername !== admin.username) {
      return NextResponse.json({ success: false, error: 'Invalid current credentials' }, { status: 401 });
    }

    const match = await bcrypt.compare(currentPassword, admin.password);
    if (!match) {
      return NextResponse.json({ success: false, error: 'Invalid current credentials' }, { status: 401 });
    }

    // Update credentials
    const hashed = await bcrypt.hash(newPassword, 10);
    admin.username = newUsername;
    admin.password = hashed;
    await admin.save();

    // Clear token cookie so they must re-login with new credentials
    const res = NextResponse.json({ success: true, message: 'Credentials updated successfully' });
    res.cookies.set('token', '', { httpOnly: true, path: '/', maxAge: 0, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });

    return res;
  } catch (error) {
    console.error('Error updating credentials:', error);
    return NextResponse.json({ success: false, error: 'আপডেট করতে সমস্যা হয়েছে' }, { status: 500 });
  }
}