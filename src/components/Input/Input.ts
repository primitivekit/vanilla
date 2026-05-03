import type { InputOptions } from './types';
import './Input.css';

export class Input {
  private wrapper: HTMLDivElement;
  private input: HTMLInputElement;
  private options: Required<Omit<InputOptions, 'onChange'>> & { onChange?: (value: string) => void };

  constructor(options: InputOptions = {}) {
    this.options = {
      label: options.label,
      type: options.type || 'text',
      size: options.size || 'medium',
      placeholder: options.placeholder,
      disabled: options.disabled || false,
      required: options.required || false,
      error: options.error,
      helperText: options.helperText,
      value: options.value || '',
      onChange: options.onChange,
    };

    this.wrapper = this.createWrapper();
    this.input = this.wrapper.querySelector('input')!;
  }

  private createWrapper(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'pk-input-wrapper';

    if (this.options.label) {
      const label = document.createElement('label');
      label.className = 'pk-input__label';
      label.textContent = this.options.label;
      if (this.options.required) {
        const required = document.createElement('span');
        required.className = 'pk-input__required';
        required.textContent = '*';
        label.appendChild(required);
      }
      wrapper.appendChild(label);
    }

    const input = document.createElement('input');
    input.className = `pk-input pk-input--${this.options.size}${this.options.error ? ' pk-input--error' : ''}`;
    input.type = this.options.type;
    if (this.options.placeholder) input.placeholder = this.options.placeholder;
    input.disabled = this.options.disabled;
    input.required = this.options.required;
    input.value = this.options.value;

    if (this.options.onChange) {
      input.addEventListener('input', (e) => {
        this.options.onChange!((e.target as HTMLInputElement).value);
      });
    }

    wrapper.appendChild(input);

    if (this.options.error) {
      const error = document.createElement('span');
      error.className = 'pk-input__error';
      error.textContent = this.options.error;
      wrapper.appendChild(error);
    } else if (this.options.helperText) {
      const helper = document.createElement('span');
      helper.className = 'pk-input__helper';
      helper.textContent = this.options.helperText;
      wrapper.appendChild(helper);
    }

    return wrapper;
  }

  public getValue(): string {
    return this.input.value;
  }

  public setValue(value: string): void {
    this.input.value = value;
  }

  public getElement(): HTMLDivElement {
    return this.wrapper;
  }

  public destroy(): void {
    this.wrapper.remove();
  }
}
