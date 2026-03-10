import { Button } from '@sprocketui-react/button';

import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

interface ButtonRenderProps {
  isHovered: boolean;
  isPressed: boolean;
  isFocused: boolean;
  isFocusVisible: boolean;
  isDisabled: boolean;
  isPending: boolean;
}

function cyberStyle(state: ButtonRenderProps): CSSProperties {
  const { isHovered, isPressed, isDisabled, isPending, isFocusVisible } = state;

  const base: CSSProperties = {
    fontFamily: "'Share Tech Mono', monospace",
    fontWeight: 400,
    padding: '10px 28px',
    fontSize: '11px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    background: 'rgba(255, 255, 255, 0.06)',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    borderRadius: 0,
    transition: 'transform 0.3s ease-out, background 0.3s ease-out',
    outline: 'none',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    transform: 'translateY(0) scale(1)',
    willChange: 'transform',
  };

  if (isDisabled) {
    return {
      ...base,
      cursor: 'not-allowed',
      opacity: 0.5,
      transform: 'none',
    };
  }

  if (isPending) {
    return {
      ...base,
      cursor: 'wait',
      color: 'rgba(255, 255, 255, 0.5)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      animation: 'sprocket-pulse 2s ease-in-out infinite',
    };
  }

  if (isPressed) {
    return {
      ...base,
      background: 'rgba(255, 255, 255, 0.15)',
      transform: 'scale(0.98)',
    };
  }

  if (isHovered) {
    return {
      ...base,
      background: 'rgba(255, 255, 255, 0.12)',
    };
  }

  if (isFocusVisible) {
    return {
      ...base,
      borderColor: 'rgba(255, 255, 255, 0.8)',
      boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.4)',
    };
  }

  return base;
}

const stageStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

  @keyframes sprocket-pulse {
    0%, 100% { border-color: rgba(255, 255, 255, 0.2); }
    50% { border-color: rgba(255, 255, 255, 0.5); box-shadow: 0 0 12px rgba(255, 255, 255, 0.06); }
  }

  .cyber-btn-wrap {
    position: relative;
    display: inline-block;
  }

  /* Corner bracket accents */
  .corner-accent {
    position: absolute;
    width: 10px;
    height: 10px;
    pointer-events: none;
    transition: transform 0.3s ease;
    will-change: transform;
  }
  .corner-accent::before,
  .corner-accent::after {
    content: '';
    position: absolute;
    background: rgba(255, 255, 255, 0.6);
    transition: transform 0.3s ease;
    will-change: transform;
  }

  /* Top Left */
  .corner-tl { top: -1px; left: -1px; }
  .corner-tl::before { top: 0; left: 0; width: 6px; height: 1px; transform-origin: left center; }
  .corner-tl::after { top: 0; left: 0; width: 1px; height: 6px; transform-origin: center top; }

  /* Top Right */
  .corner-tr { top: -1px; right: -1px; }
  .corner-tr::before { top: 0; right: 0; width: 6px; height: 1px; transform-origin: right center; }
  .corner-tr::after { top: 0; right: 0; width: 1px; height: 6px; transform-origin: center top; }

  /* Bottom Left */
  .corner-bl { bottom: -1px; left: -1px; }
  .corner-bl::before { bottom: 0; left: 0; width: 6px; height: 1px; transform-origin: left center; }
  .corner-bl::after { bottom: 0; left: 0; width: 1px; height: 6px; transform-origin: center bottom; }

  /* Bottom Right */
  .corner-br { bottom: -1px; right: -1px; }
  .corner-br::before { bottom: 0; right: 0; width: 6px; height: 1px; transform-origin: right center; }
  .corner-br::after { bottom: 0; right: 0; width: 1px; height: 6px; transform-origin: center bottom; }

  /* Hover: expand corners outward */
  .cyber-btn-wrap:hover .corner-tl { transform: translate(-5px, -5px); }
  .cyber-btn-wrap:hover .corner-tr { transform: translate(5px, -5px); }
  .cyber-btn-wrap:hover .corner-bl { transform: translate(-5px, 5px); }
  .cyber-btn-wrap:hover .corner-br { transform: translate(5px, 5px); }
  .cyber-btn-wrap:hover .corner-accent::before { transform: scaleX(1.25); }
  .cyber-btn-wrap:hover .corner-accent::after { transform: scaleY(1.25); }

  /* Active: expand further */
  .cyber-btn-wrap:active .corner-tl { transform: translate(-6px, -6px); }
  .cyber-btn-wrap:active .corner-tr { transform: translate(6px, -6px); }
  .cyber-btn-wrap:active .corner-bl { transform: translate(-6px, 6px); }
  .cyber-btn-wrap:active .corner-br { transform: translate(6px, 6px); }
  .cyber-btn-wrap:active .corner-accent::before { transform: scaleX(2); }
  .cyber-btn-wrap:active .corner-accent::after { transform: scaleY(2); }

  /* Glow overlay */
  .glow-overlay {
    position: absolute;
    inset: -8px;
    pointer-events: none;
    z-index: -1;
  }
  .glow-overlay::before {
    content: '';
    position: absolute;
    inset: 8px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .glow-overlay::after {
    content: '';
    position: absolute;
    inset: -4px;
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    filter: blur(16px);
  }
  .cyber-btn-wrap:hover .glow-overlay::before,
  .cyber-btn-wrap:hover .glow-overlay::after {
    opacity: 1;
  }
  .cyber-btn-wrap:active .glow-overlay::after {
    opacity: 1;
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.15) 40%, transparent 70%);
  }
`;

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isPending: { control: 'boolean' },
    onPress: { action: 'pressed' },
  },
  args: {
    children: 'Initialize',
    isDisabled: false,
    isPending: false,
    style: cyberStyle,
  },
  decorators: [
    (Story) => (
      <>
        <style>{stageStyle}</style>
        <div className="cyber-btn-wrap">
          <div className="glow-overlay" />
          <div className="corner-accent corner-tl" />
          <div className="corner-accent corner-tr" />
          <div className="corner-accent corner-bl" />
          <div className="corner-accent corner-br" />
          <Story />
        </div>
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    children: 'Offline',
  },
};

export const Pending: Story = {
  args: {
    isPending: true,
    children: 'Syncing...',
  },
};

export const AsAnchor: Story = {
  args: {
    elementType: 'a',
    href: 'https://example.com',
    target: '_blank',
    children: 'Navigate',
  },
};
