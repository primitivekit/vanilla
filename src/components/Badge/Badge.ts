import './Badge.css';

export type BadgeVariant = 'solid' | 'subtle' | 'outline';
export type BadgeColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeOptions {
  variant?: BadgeVariant;
  colorScheme?: BadgeColorScheme;
  size?: BadgeSize;
  className?: string;
}

export class Badge {
  private element: HTMLSpanElement;
  private options: Required<BadgeOptions>;

  constructor(options: BadgeOptions = {}) {
    this.options = {
      variant: options.variant || 'solid',
      colorScheme: options.colorScheme || 'primary',
      size: options.size || 'medium',
      className: options.className || ''
    };

    this.element = this.createElement();
  }

  private createElement(): HTMLSpanElement {
    const span = document.createElement('span');
    
    const classes = [
      'badge',
      `badge--${this.options.variant}`,
      `badge--${this.options.colorScheme}`,
      `badge--${this.options.size}`,
      this.options.className
    ].filter(Boolean);

    span.className = classes.join(' ');
    return span;
  }

  public setContent(content: string | HTMLElement): void {
    if (typeof content === 'string') {
      this.element.textContent = content;
    } else {
      this.element.innerHTML = '';
      this.element.appendChild(content);
    }
  }

  public mount(parent: HTMLElement): void {
    parent.appendChild(this.element);
  }

  public unmount(): void {
    this.element.remove();
  }

  public getElement(): HTMLSpanElement {
    return this.element;
  }
}
