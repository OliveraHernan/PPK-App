"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BaseForm from '@/src/components/forms/Base/BaseForm';

const ConfirmPassword: React.FC = () => {
  const [status, setStatus] = useState<{ type: 'error' | 'success' | null; message: string }>({ type: null, message: '' });
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      setStatus({ type: 'success', message: '¡Contraseña actualizada con éxito!' });
      // Redirigir a la página principal
      router.push('/');
    } catch (error) {
      setStatus({ type: 'error', message: 'Error al actualizar la contraseña. Intenta nuevamente.' });
    }
  };

  // El contenido principal del formulario, incluyendo el mensaje de éxito
  const mainContent = (
    <>
      <div className="text-center mb-6">
        <p>Su contraseña ha sido actualizada con éxito</p>
      </div>
    </>
  );

  return (
    <BaseForm
      title="Restablecer Contraseña"
      submitText="Iniciar Sesion"
      onSubmit={handleSubmit}
      additionalContent={null}
      fields={[]}
      logo={true}
    >
      {mainContent}
    </BaseForm>
  );
};

export default ConfirmPassword;