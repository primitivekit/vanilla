import './Space.css';

export type SpaceSize = 'small' | 'medium' | 'large' | number;
export type SpaceDirection = 'horizontal' | 'vertical';
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';

export interface SpaceOptions {
  size?: SpaceSize;
  direction?: SpaceDirection;
  align?: SpaceAlign;
  wrap?: boolean;
  className?: string;
}

export class Space {
  private element: HTMLDivElement;
  private options: Required<Omit<SpaceOptions, 'align'>> & { align?: SpaceAlign };

  constructor(options: SpaceOptions = {}) {
    this.options = {
      size: options.size || 'medium',
      direction: options.direction || 'horizontal',
      align: options.align,
      wrap: options.wrap || false,
      className: options.className || ''
    };

    this.element = this.createElement();
  }

  private createElement(): HTMLDivElement {
    const div = document.createElement('div');
    
    const classes = [
      'space',
      `space--${this.options.direction}`,
      typeof this.options.size === 'string' ? `space--${this.options.size}` : '',
      this.options.align ? `space--align-${this.options.align}` : '',
      this.options.wrap ? 'space--wrap' : '',
      this.options.className
    ].filter(Boolean);

    div.className = classes.join(' ');

    if (typeof this.options.size === 'number') {
      div.style.setProperty('--space-gap', `${this.options.size}px`);
    }

    return div;
  }

  public addItem(content: string | HTMLElement): void {
    const item = document.createElement('div');
    item.className = 'space__item';
    
    if (typeof content === 'string') {
      item.innerHTML = content;
    } else {
      item.appendChild(content);
    }
    
    this.element.appendChild(item);
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
}
