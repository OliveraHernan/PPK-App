import { ZodSchema } from "zod";

export interface Field {
    name: string;
    type?: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    defaultValue?: string;
  }
  
  export interface BaseFormProps {
    title?: string;
    fields?: Field[];
    submitText?: string;
    validationSchema?: ZodSchema; // Schema for validation
    onSubmit: (data: Record<string, string>) => void;
    footer?: React.ReactNode;
    logo?: boolean;
    isLoading?: boolean;
    additionalContent?: React.ReactNode;
  }
  