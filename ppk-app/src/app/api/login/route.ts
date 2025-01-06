import User from '@/src/lib/db/models/Users';
import connectDB from '@/src/lib/db/mongodb';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/src/lib/auth/token';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email, contraseña } = await request.json();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: 'Email o contraseña incorrectos' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Email o contraseña incorrectos' }, { status: 401 });
    }

    const token = await generateToken({
      id: user._id.toString(),
      email: user.email,
      nombreYapellido: user.nombreYapellido,
    });

    return NextResponse.json({ token });
  } catch (error: any) {
    console.error('Error en POST /api/auth/login:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}