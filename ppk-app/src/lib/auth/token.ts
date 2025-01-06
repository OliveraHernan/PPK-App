// src/lib/auth/token.ts

import { SignJWT, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface TokenPayload {
    id: string;
    email: string;
    nombreYapellido: string;
    [key: string]: any; // Permite campos adicionales si son necesarios
  }

  export async function generateToken(payload: TokenPayload): Promise<string> {
    try {
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secretKey);
      
      return token;
    } catch (error) {
      console.error('Error generando token:', error);
      throw new Error('Error al generar el token de autenticación');
    }
  }
  
  export async function verifyToken(token: string): Promise<TokenPayload> {
    try {
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
      const { payload } = await jwtVerify(token, secretKey);
      return payload as TokenPayload;
    } catch (error) {
      console.error('Error verificando token:', error);
      throw new Error('Token inválido o expirado');
    }
  }
  
  export async function authMiddleware(request: Request) {
    try {
      const token = request.headers.get('Authorization')?.split(' ')[1];
      if (!token) {
        throw new Error('Token no proporcionado');
      }
  
      return await verifyToken(token);
    } catch (error) {
      throw new Error('No autorizado');
    }
  }