"use client";
import BaseForm from '@/src/components/forms/Base/BaseForm';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from '../../hooks/use-toast';

const NewPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const email = searchParams.get('email');

  useEffect(() => {
    if (!email) {
      toast({
        title: 'Link inválido',
        description: 'El link de recuperación está incompleto.',
        variant: 'destructive',
      });
      router.push('/');
    }
  }, [email, router]);

  const fields = [
    { name: 'password', type: 'password', label: 'Nueva Contraseña', required: true },
    { name: 'confirmPassword', type: 'password', label: 'Confirmar Contraseña', required: true },
  ];

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      setIsLoading(true);

      if (data.password !== data.confirmPassword) {
        toast({
          title: 'Las contraseñas no coinciden',
          variant: 'destructive',
        });
        return;
      }

      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast({
        title: 'Contraseña actualizada',
        description: 'Tu contraseña ha sido actualizada correctamente.',
        variant: 'default',
      });
      router.push('/confirmPassword');
      
    } catch (err: any) {
      console.error('Error al resetear contraseña:', err);
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseForm 
      fields={fields} 
      title="Ingresar una nueva contraseña" 
      submitText="Cambiar"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default NewPassword;