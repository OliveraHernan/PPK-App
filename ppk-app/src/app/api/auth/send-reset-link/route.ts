import User from '@/src/lib/db/models/Users';
import connectDB from '@/src/lib/db/mongodb';
import { sendEmail } from '@/src/lib/email';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email } = await request.json();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      return NextResponse.json(
        { error: 'El formato del email no es válido.' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { exists: false, message: 'El email no está registrado' },
        { status: 200 }
      );
    }

    // Generar token único
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    const resetLink = `${process.env.NEXTAUTH_URL}/newPassword?token=${token}&email=${encodeURIComponent(email)}`;

    await sendEmail({
      to: user.email,
      subject: 'Recuperación de contraseña - PPK',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Recuperación de contraseña</h1>
          <div style="padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
            <p>Hola,</p>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
            <p>Para continuar con el proceso, haz clic en el siguiente enlace:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" 
                 style="background-color: #007bff; 
                        color: white; 
                        padding: 12px 25px; 
                        text-decoration: none; 
                        border-radius: 4px; 
                        display: inline-block;">
                Restablecer contraseña
              </a>
            </div>
            <p>Si no solicitaste este cambio, puedes ignorar este mensaje. Tu contraseña permanecerá igual.</p>
            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              Este es un mensaje automático, por favor no respondas a este correo.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      exists: true,
      message: 'Se ha enviado un email con las instrucciones',
    });
  } catch (error: any) {
    console.error('Error en POST /api/auth/send-reset-link:', error.message);
    return NextResponse.json(
      { 
        error: 'Error en el servidor. Por favor, intenta nuevamente más tarde.' 
      },
      { status: 500 }
    );
  }
}
