import User from '@/src/lib/db/models/Users';
import connectDB from '@/src/lib/db/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email } = await request.json();
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { exists: false, message: 'El email no está registrado' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { exists: true, message: 'Email verificado correctamente' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error en POST /api/auth/verify-email:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
