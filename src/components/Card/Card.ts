import './Card.css';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardOptions {
  variant?: CardVariant;
  hoverable?: boolean;
  clickable?: boolean;
  className?: string;
  onClick?: () => void;
}

export class Card {
  private element: HTMLDivElement;
  private options: Required<CardOptions>;

  constructor(options: CardOptions = {}) {
    this.options = {
      variant: options.variant || 'elevated',
      hoverable: options.hoverable || false,
      clickable: options.clickable || false,
      className: options.className || '',
      onClick: options.onClick || (() => {})
    };

    this.element = this.createElement();
  }

  private createElement(): HTMLDivElement {
    const div = document.createElement('div');
    
    const classes = [
      'card',
      `card--${this.options.variant}`,
      this.options.hoverable ? 'card--hoverable' : '',
      this.options.clickable ? 'card--clickable' : '',
      this.options.className
    ].filter(Boolean);

    div.className = classes.join(' ');

    if (this.options.clickable) {
      div.setAttribute('role', 'button');
      div.setAttribute('tabindex', '0');
      div.addEventListener('click', this.options.onClick);
    }

    return div;
  }

  public setContent(content: string | HTMLElement): void {
    if (typeof content === 'string') {
      this.element.innerHTML = content;
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

  public getElement(): HTMLDivElement {
    return this.element;
  }

  public destroy(): void {
    if (this.options.clickable) {
      this.element.removeEventListener('click', this.options.onClick);
    }
    this.unmount();
  }
}
