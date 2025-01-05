"use client";
import React from 'react';
import BaseForm from '@/src/components/forms/Base/BaseForm';
import Link from 'next/link';

const LoginForm: React.FC = () => {
  const handleLogin = (data: Record<string, string>) => {
    console.log('Login Data:', data);
  };

  const fields = [
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'password', type: 'password', label: 'Contraseña', required: true },
  ];

  const loginAdditionalContent = (
    <div className="space-y-6">
      <Link 
        href="/forgot-password"
        className="text-sm text-primary hover:underline block -mt-2 text-left"
      >
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
          <Link 
            href="/register"
            className="text-primary hover:underline font-medium"
          >
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