import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Roles } from './lib/utils/roles';

const accessRules: { [key: string]: string[] } = {
  '/dashboard': [Roles.ADMIN],
};
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const role = request.cookies.get('role'); // Suponiendo que el rol también se almacena en las cookies
  const url = request.nextUrl.pathname;

  // Si no hay token y la ruta requiere autenticación
  if (!token && accessRules[url]) {
    return NextResponse.redirect(new URL('/', request.url)); // Redirigir a /login
  }

  // Verificar el acceso basado en roles
  if (url === '/dashboard' && role?.value !== Roles.ADMIN) {
    return NextResponse.redirect(new URL('/403', request.url)); // Redirigir a una página de acceso denegado
  }

  return NextResponse.next();
}