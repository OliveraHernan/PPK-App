"use client";
import React, { useState } from 'react';
import BaseForm from '@/src/components/forms/Base/BaseForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Linkedin, Twitter, Facebook, Loader2 } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [status, setStatus] = useState<{ type: 'error' | 'success' | null; message: string }>({ type: null, message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: Record<string, string>) => {
    try {
      setIsLoading(true);
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

      localStorage.setItem('token', result.token);
      setStatus({ 
        type: 'success', 
        message: '¡Inicio de sesión exitoso! Redirigiendo...' 
      });

      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error: any) {
      setStatus({ 
        type: 'error', 
        message: error.message || 'Ha ocurrido un error al intentar iniciar sesión' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'contraseña', type: 'password', label: 'Contraseña', required: true },
  ];

  const StatusMessage = () => {
    if (!status.type) return null;

    return (
      <div 
        className={`text-center p-3 rounded-lg ${
          status.type === 'error' 
            ? 'bg-red-100 text-red-700' 
            : 'bg-green-100 text-green-700'
        }`}
        role="alert"
      >
        {status.message}
      </div>
    );
  };

  const loginAdditionalContent = (
    <div className="space-y-6">
      <Link href="/restartPassword" className="text-sm text-primary hover:underline block -mt-2 text-left">
        ¿Olvidaste tu contraseña?
      </Link>

      {status.type && <StatusMessage />}

      <div className="text-center space-y-4">
        <div className="text-sm text-white">o continua con</div>

        <div className="flex justify-center space-x-4">
          <button 
            className="bg-white hover:bg-gray-300 p-2 border rounded-lg text-gray-800 disabled:opacity-50"
            disabled={isLoading}
          >
            <Linkedin />
          </button>
          <button 
            className="bg-white hover:bg-gray-300 p-2 border rounded-lg text-gray-800 disabled:opacity-50"
            disabled={isLoading}
          >
            <Twitter />
          </button>
          <button 
            className="bg-white hover:bg-gray-300 p-2 border rounded-lg text-gray-800 disabled:opacity-50"
            disabled={isLoading}
          >
            <Facebook />
          </button>
        </div>

        <div className="text-sm text-white">
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