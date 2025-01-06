"use client";
import React, { useState } from 'react';
import BaseForm from '@/src/components/forms/Base/BaseForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const [status, setStatus] = useState<{ type: 'error' | 'success' | null; message: string }>({ type: null, message: '' });
  const router = useRouter();

  const handleLogin = async (data: Record<string, string>) => {
    try {
      setStatus({ type: null, message: '' });

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al iniciar sesión');
      }

      // Almacenar el token JWT en el almacenamiento local
      localStorage.setItem('token', result.token);

      setStatus({ type: 'success', message: '¡Inicio de sesión exitoso! Redirigiendo...' });

      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error completo:', error);
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Error desconocido' });
    }
  };

  const fields = [
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'contraseña', type: 'password', label: 'Contraseña', required: true },
  ];

  const loginAdditionalContent = (
    <div className="space-y-6">
      <Link href="/restartPassword" className="text-sm text-primary hover:underline block -mt-2 text-left">
        ¿Olvidaste tu contraseña?
      </Link>

      <div className="text-center space-y-4">
        <div className="text-sm text-gray-500">o continua con</div>

        <div className="flex justify-center space-x-4">
          <button className="p-2 border rounded-lg hover:bg-gray-50">
            <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
          </button>
          <button className="p-2 border rounded-lg hover:bg-gray-50">
            <img src="/x-icon.svg" alt="X" className="w-6 h-6" />
          </button>
          <button className="p-2 border rounded-lg hover:bg-gray-50">
            <img src="/facebook-icon.svg" alt="Facebook" className="w-6 h-6" />
          </button>
        </div>

        <div className="text-sm text-gray-600">
          ¿Todavía no tienes una cuenta?{' '}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <BaseForm
      title=""
      fields={fields}
      onSubmit={handleLogin}
      submitText="Inicia sesión"
      additionalContent={loginAdditionalContent}
    />
  );
};

export default LoginForm;