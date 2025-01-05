"use client";
import BaseForm from '@/src/components/forms/Base/BaseForm';
import React from 'react';
import Link from 'next/link';

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
          ¿Ya tienes una cuenta?{' '}
          <Link 
            href="/login"
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