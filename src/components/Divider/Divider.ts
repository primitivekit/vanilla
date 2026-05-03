import './Divider.css';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

export interface DividerOptions {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  label?: string;
  className?: string;
}

export class Divider {
  private element: HTMLElement;
  private options: Required<Omit<DividerOptions, 'label'>> & { label?: string };

  constructor(options: DividerOptions = {}) {
    this.options = {
      orientation: options.orientation || 'horizontal',
      variant: options.variant || 'solid',
      label: options.label,
      className: options.className || ''
    };

    this.element = this.createElement();
  }

  private createElement(): HTMLElement {
    const classes = [
      'divider',
      `divider--${this.options.orientation}`,
      `divider--${this.options.variant}`,
      this.options.label ? 'divider--with-label' : '',
      this.options.className
    ].filter(Boolean);

    if (this.options.label && this.options.orientation === 'horizontal') {
      const div = document.createElement('div');
      div.className = classes.join(' ');
      div.setAttribute('role', 'separator');

      const line1 = document.createElement('hr');
      line1.className = 'divider__line';

      const label = document.createElement('span');
      label.className = 'divider__label';
      label.textContent = this.options.label;

      const line2 = document.createElement('hr');
      line2.className = 'divider__line';

      div.appendChild(line1);
      div.appendChild(label);
      div.appendChild(line2);

      return div;
    } else {
      const hr = document.createElement('hr');
      hr.className = classes.join(' ');
      hr.setAttribute('role', 'separator');
      hr.setAttribute('aria-orientation', this.options.orientation);
      return hr;
    }
  }

  public mount(parent: HTMLElement): void {
    parent.appendChild(this.element);
  }

  public unmount(): void {
    this.element.remove();
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
