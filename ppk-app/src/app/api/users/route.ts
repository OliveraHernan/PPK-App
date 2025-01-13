import User from '@/src/lib/db/models/Users';
import connectDB from '@/src/lib/db/mongodb';
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/src/lib/auth/token';


// Tipo de datos esperado para un usuario
interface UserData {
  nombreYapellido: string;
  email: string;
  contraseña: string;
  position: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Validaciones
async function validateUserData(data: any): Promise<void> {
  if (!data.nombreYapellido?.trim()) {
    throw new Error('El nombre y apellido son requeridos');
  }

  if (!data.email?.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    throw new Error('El email es inválido');
  }

  if (!data.contraseña || data.contraseña.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres');
  }

  const existingUser = await User.findOne({ email: data.email.toLowerCase() });
  if (existingUser) {
    throw new Error('El email ya está registrado.');
  }
}


// Convertir IDs y manejar fechas
function convertUserDataToMongooseFormat(data: UserData) {
  const converted = { ...data };

  // Asignar fechas si no existen
  converted.createdAt = data.createdAt || new Date();
  converted.updatedAt = new Date();

  return converted;
}

// Crear un usuario

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    // Validación básica
    if (!body.nombreYapellido?.trim() || !body.email?.trim() || !body.contraseña) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Validar email existente
    const existingUser = await User.findOne({ email: body.email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 400 }
      );
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(body.contraseña, 10);

    // Crear nuevo usuario
    const user = new User({
      nombreYapellido: body.nombreYapellido,
      email: body.email.toLowerCase(),
      contraseña: hashedPassword,
      isActive: true
    });

    
    await user.save();

   // Generar token JWT
   const token = await generateToken({
    id: user._id.toString(),
    email: user.email,
    nombreYapellido: user.nombreYapellido
  });
  // Actualizar el token en la base de datos
  user.token = token;
  await user.save();
    return NextResponse.json({
      message: "Usuario registrado exitosamente",
      token,
      user: {
        id: user._id,
        email: user.email,
        nombreYapellido: user.nombreYapellido
      }
    });

  } catch (error: any) {
    console.error("Error en registro de usuario:", error);
    return NextResponse.json(
      { error: error.message || "Error al registrar usuario" },
      { status: 500 }
    );
  }
}

// Obtener usuarios con filtros y paginación
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query: any = {};

    // Filtros opcionales
    const position = searchParams.get('position');
    const isActive = searchParams.get('isActive');

    if (position) {
      query.position = position;
    }

    if (isActive !== null) {
      query.isActive = isActive === 'true';
    }

    // Paginación
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Obtener el total de usuarios
    const total = await User.countDocuments(query);

    // Consultar usuarios
    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error en GET /api/users:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
