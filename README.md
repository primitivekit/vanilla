# @primitivekit/vanilla

Primitive vanilla JavaScript components with zero hardcoded values. Fully customizable via CSS variables.

## Status

🚧 **In Development** - Version 0.0.1

This package is currently under active development. Components will be added incrementally.

## Philosophy

- **Zero Hardcoded Values** - Every visual property controlled through CSS variables
- **Type-Safe** - Full TypeScript support with comprehensive type definitions  
- **Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- **Customizable** - 50-150+ CSS variables per component
- **Lightweight** - Zero dependencies, pure JavaScript
- **Framework Agnostic** - Works with any framework or no framework at all

## Installation

```bash
npm install @primitivekit/vanilla
```

## Planned Features

### 🎨 600+ Design Tokens
Comprehensive design token system with 21 categories (shared across all PrimitiveKit frameworks)

### 🧩 38 Components (Coming Soon)
Complete component library covering all essential UI needs:
- **Form Components**: Button, Input, Textarea, Select, Checkbox, Radio, Switch
- **Layout Components**: Card, Container, Stack, Grid, Divider, Space
- **Feedback Components**: Badge, Spinner, Alert, Progress, Skeleton
- **Navigation Components**: Link, Tabs, Breadcrumb
- **Overlay Components**: Modal, Tooltip, Popover, Dropdown
- **Data Display**: Avatar, Tag, Empty, Image, Collapse, Table
- **Data Entry**: Form, Slider, Upload
- **Other**: Typography, Menu, Drawer, Steps

## Quick Start (Coming Soon)

```javascript
import { Button, Input, Card } from '@primitivekit/vanilla';

const card = new Card();
const input = new Input({
  label: 'Email',
  type: 'email',
  placeholder: 'Enter your email'
});
const button = new Button({
  variant: 'primary',
  size: 'large',
  text: 'Submit'
});

card.append(input, button);
document.body.appendChild(card.element);
```

Or use as Web Components:

```html
<pk-card>
  <pk-input
    label="Email"
    type="email"
    placeholder="Enter your email"
  ></pk-input>
  
  <pk-button variant="primary" size="large">
    Submit
  </pk-button>
</pk-card>
```

## Documentation

- **Main Docs:** [https://primitivekit.github.io/docs/](https://primitivekit.github.io/docs/)
- **Vanilla Guide:** [https://primitivekit.github.io/docs/vanilla/](https://primitivekit.github.io/docs/vanilla/)

## Contributing

Contributions welcome! This is a new package and we'd love your help building it.

## License

MIT - See [LICENSE](./LICENSE) for details

## Links

- **NPM:** https://www.npmjs.com/package/@primitivekit/vanilla
- **GitHub:** https://github.com/primitivekit/vanilla
- **Documentation:** https://primitivekit.github.io/docs/

---

**Version:** 0.0.1  
**Status:** In Development  
**Maintained by:** PrimitiveKit Team
