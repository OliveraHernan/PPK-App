
import connectDB from '@lib/db/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import User from '@lib/db/models/Users';

// Tipo de datos esperado para un usuario
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'guest';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Validaciones
function validateUserData(data: UserData): void {
  if (!data.firstName?.trim()) {
    throw new Error('El nombre del usuario es requerido');
  }

  if (!data.email?.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    throw new Error('El email del usuario es inválido');
  }

  if (!data.password || data.password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres');
  }

  if (!['admin', 'user', 'guest'].includes(data.role)) {
    throw new Error('El rol del usuario es inválido');
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
export async function POST(req: Request) {
  try {
    await connectDB();

    const data: UserData = await req.json();
    console.log('Datos recibidos:', data);

    // Validar los datos del usuario
    validateUserData(data);

    // Convertir datos al formato de Mongoose
    const convertedData = convertUserDataToMongooseFormat(data);

    // Crear y guardar el usuario
    const user = new User(convertedData);
    await user.save();

    return NextResponse.json(user);
  } catch (error: any) {
    console.error("Error en POST /api/users:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: error.message.includes('requerido') || error.message.includes('inválido') ? 400 : 500 }
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
    const role = searchParams.get('role');
    const isActive = searchParams.get('isActive');

    if (role && ['admin', 'user', 'guest'].includes(role)) {
      query.role = role;
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
