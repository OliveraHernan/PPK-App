// BaseForm.tsx
import React from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '@radix-ui/react-label';
import { BaseFormProps } from '@/src/lib/interfaces/BaseFormInterfaces';
import Image from 'next/image';
import '/src/styles/style.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface ExtendedBaseFormProps extends BaseFormProps {
  children?: React.ReactNode;
  validationSchema?: any;
  useValidation?: boolean; // Nueva prop para controlar si se usa validación
}

const BaseForm: React.FC<ExtendedBaseFormProps> = ({
  title,
  fields = [],
  submitText = 'Submit',
  onSubmit,
  footer,
  logo = true,
  isLoading = false,
  additionalContent,
  children,
  validationSchema,
  useValidation = false, // Por defecto, no usa validación
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: useValidation && validationSchema ? zodResolver(validationSchema) : undefined,
    mode: 'onChange'
  });

  const onSubmitHandler = async (data: any) => {
    try {
      await onSubmit(data);
    } catch (err: any) {
      console.error(err);
    }
  };

  // Si no se usa validación, usar el formulario tradicional
  const handleTraditionalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fields.forEach((field) => {
      data[field.name] = formData.get(field.name) as string;
    });
    await onSubmit(data);
  };

  return (
    <div className="bg-[#7800de] min-h-screen flex items-center justify-center relative">
      <Image src="/Dice.svg" alt="Dice-1" className="absolute w-64 h-64 top-28 left-20" width={80} height={80} />
      <div className="custom-gradient w-[75%] h-[750px] justify-items-center content-center border-1 shadow-2xl shadow-gray-800 rounded-2xl">
        <Card className="bg-[#5882C1] bg-opacity-25 border-[#5882C1] rounded-3xl w-96">
          <form 
            onSubmit={useValidation ? handleSubmit(onSubmitHandler) : handleTraditionalSubmit} 
            className="space-y-4 p-6"
          >
            {logo && (
              <div className="flex justify-center">
                <Image src="/logo.png" alt="Logo" className="w-20 h-20" width={80} height={80} />
              </div>
            )}

            {children}

            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name} className="block text-sm font-medium text-white">
                    {field.label}
                  </Label>
                  <Input
                    id={field.name}
                    {...(useValidation ? register(field.name) : { name: field.name })}
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full rounded-lg border-gray-300"
                  />
                  {useValidation && errors[field.name] && (
                    <p className="text-white-500 text-sm">
                      {errors[field.name]?.message as string}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || (useValidation && !isValid)}
            >
              {isLoading ? 'Loading...' : submitText}
            </Button>

            {additionalContent && (
              <div className="mt-6">{additionalContent}</div>
            )}
          </form>
        </Card>
      </div>
      <Image src="/Dice.svg" alt="Dice-2" className="absolute w-64 h-64 bottom-36 right-20" width={80} height={80} />
    </div>
  );
};

export default BaseForm;