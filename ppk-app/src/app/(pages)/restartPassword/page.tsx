"use client";
import BaseForm from '@/src/components/forms/Base/BaseForm';
import React from 'react';


const RestartPasswordForm = () => {
  const fields = [
    { name: 'email', type: 'email', label: 'Email', required: true },
  ];

  const handleSubmit = (data: Record<string, any>) => {
    console.log('Reset Password Data:', data);
  };

  const resetAdditionalContent = (
    <div className="text-[#510096] font-bold text-center">
      ¿Olvidaste tu contraseña?
    </div>
  );

  return (
  <BaseForm fields={fields} title="¿Olvidaste tu contraseña?" submitText="Recuperar Contraseña" onSubmit={handleSubmit} additionalContent={resetAdditionalContent} />
  );

};

export default RestartPasswordForm;
