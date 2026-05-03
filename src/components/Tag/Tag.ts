import './Tag.css';

export type TagVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type TagSize = 'small' | 'medium' | 'large';

export interface TagOptions {
  variant?: TagVariant;
  size?: TagSize;
  closable?: boolean;
  className?: string;
  onClose?: () => void;
}

export class Tag {
  private element: HTMLSpanElement;
  private options: Required<TagOptions>;

  constructor(options: TagOptions = {}) {
    this.options = {
      variant: options.variant || 'default',
      size: options.size || 'medium',
      closable: options.closable || false,
      className: options.className || '',
      onClose: options.onClose || (() => {})
    };

    this.element = this.createElement();
  }

  private createElement(): HTMLSpanElement {
    const span = document.createElement('span');
    
    const classes = [
      'tag',
      `tag--${this.options.variant}`,
      `tag--${this.options.size}`,
      this.options.className
    ].filter(Boolean);

    span.className = classes.join(' ');

    const content = document.createElement('span');
    content.className = 'tag__content';
    span.appendChild(content);

    if (this.options.closable) {
      const closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.className = 'tag__close';
      closeBtn.setAttribute('aria-label', 'Close tag');
      closeBtn.innerHTML = `
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      `;
      closeBtn.addEventListener('click', this.options.onClose);
      span.appendChild(closeBtn);
    }

    return span;
  }

  public setContent(content: string | HTMLElement): void {
    const contentEl = this.element.querySelector('.tag__content');
    if (!contentEl) return;

    if (typeof content === 'string') {
      contentEl.textContent = content;
    } else {
      contentEl.innerHTML = '';
      contentEl.appendChild(content);
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

  public destroy(): void {
    if (this.options.closable) {
      const closeBtn = this.element.querySelector('.tag__close');
      closeBtn?.removeEventListener('click', this.options.onClose);
    }
    this.unmount();
  }
}
