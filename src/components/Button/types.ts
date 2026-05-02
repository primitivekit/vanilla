export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  text?: string;
  ariaLabel?: string;
  cssVariables?: Record<string, string>;
  onClick?: (event: MouseEvent) => void;
}
