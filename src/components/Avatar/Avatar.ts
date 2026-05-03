import './Avatar.css';

export type AvatarSize = 'small' | 'medium' | 'large' | number;
export type AvatarShape = 'circle' | 'square';

export interface AvatarOptions {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  className?: string;
  onClick?: () => void;
}

export class Avatar {
  private element: HTMLDivElement;
  private options: Required<Omit<AvatarOptions, 'src'>> & { src?: string };
  private imgError: boolean = false;

  constructor(options: AvatarOptions = {}) {
    this.options = {
      src: options.src,
      alt: options.alt || 'Avatar',
      size: options.size || 'medium',
      shape: options.shape || 'circle',
      className: options.className || '',
      onClick: options.onClick || (() => {})
    };

    this.element = this.createElement();
  }

  private createElement(): HTMLDivElement {
    const div = document.createElement('div');
    
    const classes = [
      'avatar',
      `avatar--${this.options.shape}`,
      typeof this.options.size === 'string' ? `avatar--${this.options.size}` : '',
      this.options.onClick ? 'avatar--clickable' : '',
      this.options.className
    ].filter(Boolean);

    div.className = classes.join(' ');

    if (typeof this.options.size === 'number') {
      div.style.setProperty('--avatar-size', `${this.options.size}px`);
    }

    if (this.options.onClick) {
      div.setAttribute('role', 'button');
      div.setAttribute('tabindex', '0');
      div.addEventListener('click', this.options.onClick);
    }

    this.renderContent();

    return div;
  }

  private renderContent(): void {
    this.element.innerHTML = '';

    if (this.options.src && !this.imgError) {
      const img = document.createElement('img');
      img.src = this.options.src;
      img.alt = this.options.alt;
      img.className = 'avatar__image';
      img.onerror = () => {
        this.imgError = true;
        this.renderContent();
      };
      this.element.appendChild(img);
    } else {
      const span = document.createElement('span');
      span.className = 'avatar__text';
      span.textContent = this.options.alt.charAt(0).toUpperCase();
      this.element.appendChild(span);
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
    if (this.options.onClick) {
      this.element.removeEventListener('click', this.options.onClick);
    }
    this.unmount();
  }
}
