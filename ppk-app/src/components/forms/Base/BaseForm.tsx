"use client";
import React, { FormEvent } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '@radix-ui/react-label';
import { BaseFormProps } from '@/src/lib/interfaces/BaseFormInterfaces';

interface ExtendedBaseFormProps extends BaseFormProps {
  children?: React.ReactNode;
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
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-pink-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur">
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {logo && (
            <div className="flex justify-center mb-6">
              <img src="/logo.svg" alt="Logo" className="w-12 h-12" />
            </div>
          )}
          
          {children}
          
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="block text-sm font-medium">
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
    </div>
  );
};

export default BaseForm;