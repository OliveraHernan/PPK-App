"use client";
import BaseForm from '@/src/components/forms/Base/BaseForm';
import React, { useState } from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Facebook } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { registerSchema } from '@/src/lib/validators/auth';

const RegisterForm = () => {
  const [status, setStatus] = useState<{
    type: 'error' | 'success' | null;
    message: string;
  }>({ type: null, message: '' });
  const router = useRouter();

  const fields = [
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'nombreApellido', type: 'text', label: 'Nombre y apellido', required: true },
    { name: 'contraseña', type: 'password', label: 'Contraseña', required: true },
    { name: 'posicion', type: 'text', label: 'Posición', required: true }
  ];

  const handleSubmit = async (formData: Record<string, any>) => {
    try {
      setStatus({ type: null, message: '' });
      
      const userData = {
        nombreYapellido: formData.nombreApellido,
        email: formData.email.toLowerCase(),
        contraseña: formData.contraseña,
        posicion: [formData.posicion],
        isActive: true
      };

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      // Añade logging para debug
      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);

  

      if (!response.ok) {
        throw new Error(result.error || 'Error al registrar usuario');
      }

      setStatus({
        type: 'success',
        message: '¡Registro exitoso! Redirigiendo...'
      });

      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (error) {
      console.error('Error completo:', error);
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  const registerAdditionalContent = (
    <div className="space-y-6">
      {status.type && (
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
      )}
      
      <div className="text-center space-y-4">
        <div className="text-sm text-white">o continua con</div>
        
        <div className="flex justify-center space-x-4">
          <button className="bg-white hover:bg-gray-300 p-2 border rounded-lg text-gray-800">
            <Linkedin />
          </button>
          <button className="bg-white hover:bg-gray-300 p-2 border rounded-lg text-gray-800">
            <Twitter />
          </button>
          <button className="bg-white hover:bg-gray-300 p-2 border rounded-lg text-gray-800">
            <Facebook />
          </button>
        </div>

        <div className="text-sm text-white">
          ¿Ya tienes una cuenta?{' '}
          <Link 
            href="/"
            className="text-primary hover:underline font-medium"
          >
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <BaseForm 
      fields={fields} 
      title="" 
      submitText="Registrarse" 
      onSubmit={handleSubmit}
      additionalContent={registerAdditionalContent}
      validationSchema={registerSchema}
      useValidation={true} 
    />
  );
};

export default RegisterForm;