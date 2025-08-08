import { ReactNode, FormEvent } from 'react';

export interface Option {
  value: string;
  label: string;
}

export interface NLFormProps {
  children: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export interface NLSelectProps {
  options: Option[];
  value?: string;
  onChange: (value: string, label: string) => void;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  index?: number;
  className?: string;
}

export interface NLInputProps {
  type?: string;
  value?: string;
  placeholder?: string;
  subline?: string;
  onChange: (value: string) => void;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  index?: number;
  className?: string;
}