import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/app/lib/mongodb';
import Admin, { getOrCreateDefaultAdmin } from '@/app/models/admin';
import { signToken } from '@/app/lib/jwt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body || {};

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Missing credentials' }, { status: 400 });
    }

    await connectToDatabase();

    // Ensure a default admin exists (username: admin, password: admin) if none present
    await getOrCreateDefaultAdmin();

    const user = await Admin.findOne({ username });
    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ id: user._id.toString(), username: user.username });

    const res = NextResponse.json({ success: true, token, message: 'Login successful' });
    // Set HTTP-only cookie for server-side auth as well
    res.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 60 * 60, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 });
  }
}
