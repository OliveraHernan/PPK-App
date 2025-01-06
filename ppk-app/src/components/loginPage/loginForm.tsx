"use client";
import React from 'react';
import BaseForm from '@/src/components/forms/Base/BaseForm';
import Link from 'next/link';
import { Linkedin, Twitter, Facebook } from 'lucide-react';

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
        href="/restartPassword"
        className="text-sm text-primary hover:underline block -mt-2 text-left"
      >
        ¿Olvidaste tu contraseña?
      </Link>
      
      <div className="text-center space-y-4">
        <div className="text-sm text-white">o continua con</div>
        
        <div className="flex justify-center space-x-4">
          <button className="bg-white hover:bg-gray-300 p-2 border rounded-lg">
            <Linkedin />
          </button>
          <button className="bg-white hover:bg-gray-300 p-2 border rounded-lg">
            <Twitter />
          </button>
          <button className="bg-white hover:bg-gray-300 p-2 border rounded-lg ">
            <Facebook />
          </button>
        </div>

        <div className="text-sm text-white">
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