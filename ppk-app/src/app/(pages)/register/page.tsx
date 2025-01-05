"use client";
import BaseForm from '@/src/components/forms/Base/BaseForm';
import React from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Facebook } from 'lucide-react';

const RegisterForm = () => {
  const fields = [
    { name: 'Email', type: 'email', label: 'Email', required: true },
    { name: 'Nombre', type: 'text', label: 'Nombre', required: true },
    { name: 'Apellido', type: 'text', label: 'Apellido', required: true },
    { name: 'Posicion', type: 'text', label: 'Posición', required: true },
  ];

  const handleSubmit = (data: Record<string, any>) => {
    console.log('Register Data:', data);
  };

  const registerAdditionalContent = (
    <div className="space-y-6">
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
      submitText="Unirme" 
      onSubmit={handleSubmit}
      additionalContent={registerAdditionalContent}
    />
  );
};

export default RegisterForm;