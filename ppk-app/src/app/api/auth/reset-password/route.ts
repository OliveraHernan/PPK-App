import { NextResponse } from 'next/server';
import Users from '@/src/lib/db/models/Users';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const { email, newPassword } = await request.json();

        if (!email || !newPassword) {
            return NextResponse.json(
                { message: 'Email y nueva contraseña son requeridos.' },
                { status: 400 }
            );
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: 'Usuario no encontrado.' },
                { status: 400 }
            );
        }

        // Actualizar la contraseña
        user.contraseña = await bcrypt.hash(newPassword, 10);
        await user.save();

        return NextResponse.json(
            { message: 'Contraseña actualizada con éxito.' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { message: 'Error al actualizar la contraseña.' },
            { status: 500 }
        );
    }
}