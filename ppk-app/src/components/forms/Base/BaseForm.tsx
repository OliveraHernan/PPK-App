"use client";
import React, { FormEvent } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '@radix-ui/react-label';
import { BaseFormProps } from '@/src/lib/interfaces/BaseFormInterfaces';
import  Img  from 'next/image';
import '/src/styles/style.css'

const BaseForm: React.FC<BaseFormProps> = ({
  title,
  fields,
  submitText = 'Submit',
  onSubmit,
  footer,
  logo = true,
  isLoading = false,
  additionalContent,
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fields.forEach((field) => {
      data[field.name] = formData.get(field.name) as string;
    });
    onSubmit(data);
  };

  return (
    <div className="custom-gradient min-h-screen flex items-center justify-center p-4">
      <Img src="/Dice.svg" alt="Dice-1" className="" width={80} height={80} />
      <Card className="bg-[#5882C1] bg-opacity-25 border-[#5882C1] rounded-3xl w-full max-w-md mx-auto backdrop-blur">
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {logo && (
            <div className="flex justify-center">
              <Img src="/logo.png" alt="Logo" className="w-20 h-20" width={80} height={80} />
            </div>
          )}
          
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
        </form>
      </Card>
      <Img src="/Dice.svg" alt="Dice-2" className="" width={80} height={80} />
    </div>
  );
};

export default BaseForm;
