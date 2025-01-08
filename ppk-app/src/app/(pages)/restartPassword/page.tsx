"use client";
import BaseForm from '@/src/components/forms/Base/BaseForm';
import React, { useState } from 'react';

async function verifyEmailAndSendLink(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // Primero verificamos el email
    const verifyResponse = await fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const verifyData = await verifyResponse.json();

    // Si el email existe, enviamos el correo
    if (verifyData.exists) {
      const sendEmailResponse = await fetch('/api/auth/send-reset-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const sendEmailData = await sendEmailResponse.json();
      return {
        success: true,
        message: sendEmailData.message
      };
    }

    // Si el email no existe, retornamos el mensaje de error
    return {
      success: false,
      message: verifyData.message
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Ha ocurrido un error'
    };
  }
}

const RestartPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fields = [
    { 
      name: 'email', 
      type: 'email', 
      label: 'Email', 
      required: true,
    },
  ];

  const handleSubmit = async (data: Record<string, any>) => {
    setLoading(true);
    setMessage(null);
    
    try {
      const result = await verifyEmailAndSendLink(data.email);
      
      setMessage({
        text: result.message,
        type: result.success ? 'success' : 'error'
      });
    } catch (error) {
      setMessage({
        text: 'Ha ocurrido un error. Por favor, intenta nuevamente.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <BaseForm 
        fields={fields} 
        title="¿Olvidaste tu contraseña?" 
        submitText={loading ? "Enviando..." : "Recuperar contraseña"}
        onSubmit={handleSubmit}
        additionalContent={message && (
          <div className={`text-center font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            <p>{message.text}</p>
          </div>
        )}
      />
    </div>
  );
};

export default RestartPasswordForm;