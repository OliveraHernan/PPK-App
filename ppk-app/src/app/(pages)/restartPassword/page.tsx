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

  return <BaseForm fields={fields} title="¿Olvidaste tu contraseña?" submitText="Send Reset Link" onSubmit={handleSubmit} />;
};

export default RestartPasswordForm;
