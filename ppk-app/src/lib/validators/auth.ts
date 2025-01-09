import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().min(1,'* Email requerido')
  .email('* Ingrese un email valido'),
  password: z.string().min(1, '* Contraseña requerida'),
});

const registerSchema = z.object({
  email: z.string().email('* Ingrese un email valido'),
  nombreApellido: z.string().min(1, '* Nombre y apellido requerido')
  .max(30, '* El nombre y apellido debe tener menos de 30 caracteres'),
  contraseña: z.string().min(6, '* La contraseña debe tener al menos 6 caracteres')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, '* La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'),
  posicion: z.string().min(1, 'Posicion requerida'),
});

const resetPasswordSchema = z.object({
  email: z.string().email('* Ingrese un email valido')
});

const confirmPasswordSchema = z.object({
  password : z.string().min(1, '* Contraseña requerida')
  .min(12 , '* La contraseña debe tener al menos 12 caracteres')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{12,}$/, '* La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'),
  confirmPassword: z.string().min(1, '* Confirmar contraseña requerida')
  .min(12 , '* La contraseña debe tener al menos 12 caracteres')
});