export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
export type InputSize = 'small' | 'medium' | 'large';

export interface InputOptions {
  label?: string;
  type?: InputType;
  size?: InputSize;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  value?: string;
  onChange?: (value: string) => void;
}
