import type { ButtonOptions, ButtonVariant, ButtonSize } from './types';
import './Button.css';

export class Button {
  private element: HTMLButtonElement;
  private options: Required<ButtonOptions>;

  constructor(options: ButtonOptions = {}) {
    this.options = {
      variant: options.variant || 'primary',
      size: options.size || 'medium',
      type: options.type || 'button',
      disabled: options.disabled || false,
      text: options.text || '',
      ariaLabel: options.ariaLabel,
      cssVariables: options.cssVariables || {},
      onClick: options.onClick,
    };

    this.element = this.createButton();
  }

  private createButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = this.options.type;
    button.className = this.getButtonClasses();
    button.disabled = this.options.disabled;
    button.textContent = this.options.text;

    if (this.options.ariaLabel) {
      button.setAttribute('aria-label', this.options.ariaLabel);
    }

    this.applyCustomStyles(button);

    if (this.options.onClick) {
      button.addEventListener('click', this.options.onClick);
    }

    return button;
  }

  private getButtonClasses(): string {
    return `pk-button pk-button--${this.options.variant} pk-button--${this.options.size}`;
  }

  private applyCustomStyles(button: HTMLButtonElement): void {
    Object.entries(this.options.cssVariables).forEach(([key, value]) => {
      button.style.setProperty(key, value);
    });
  }

  public setVariant(variant: ButtonVariant): void {
    this.options.variant = variant;
    this.element.className = this.getButtonClasses();
  }

  public setSize(size: ButtonSize): void {
    this.options.size = size;
    this.element.className = this.getButtonClasses();
  }

  public setText(text: string): void {
    this.options.text = text;
    this.element.textContent = text;
  }

  public setDisabled(disabled: boolean): void {
    this.options.disabled = disabled;
    this.element.disabled = disabled;
  }

  public getElement(): HTMLButtonElement {
    return this.element;
  }

  public destroy(): void {
    if (this.options.onClick) {
      this.element.removeEventListener('click', this.options.onClick);
    }
    this.element.remove();
  }
}
