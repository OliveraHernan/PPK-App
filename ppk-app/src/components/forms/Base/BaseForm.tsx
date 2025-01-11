"use client";
import React, { FormEvent, useState } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '@radix-ui/react-label';
import { BaseFormProps } from '@/src/lib/interfaces/BaseFormInterfaces';
import  Img  from 'next/image';
import '/src/styles/style.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface ExtendedBaseFormProps extends BaseFormProps {
  children?: React.ReactNode;
  validationSchema?: any;
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
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Limpiar error anterior
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fields.forEach((field) => {
      data[field.name] = formData.get(field.name) as string;
    });
    try {
      onSubmit(data);
    } catch (err: any) {
      setError(err.message || 'Ha ocurrido un error');
    }
  };
  

  return (
    <div className='bg-[#7800de] min-h-screen flex items-center justify-center relative'>
      <Img src="/Dice.svg" alt="Dice-1" className="absolute w-64 h-64 top-28 left-20" width={80} height={80} />
      <div className="custom-gradient w-[75%] h-[750px] justify-items-center content-center border-1 shadow-2xl shadow-gray-800 rounded-2xl ">
        <Card className="bg-[#5882C1] bg-opacity-25 border-[#5882C1] rounded-3xl w-96">
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            {logo && (
              <div className="flex justify-center">
                <Img src="/logo.png" alt="Logo" className="w-20 h-20" width={80} height={80} />
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
                    name={field.name}
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full rounded-lg border-gray-300"
                  />
                </div>
              ))}
            </div>
          
            <Button 
              type="submit" 
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg mt-6"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : submitText}
            </Button>
            
            {additionalContent && (
              <div className="mt-6">{additionalContent}</div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
          </form>
        </Card>
      </div>
      <Img src="/Dice.svg" alt="Dice-2" className="absolute w-64 h-64 bottom-36 right-20" width={80} height={80} />
    </div>
  );
};

export default BaseForm;