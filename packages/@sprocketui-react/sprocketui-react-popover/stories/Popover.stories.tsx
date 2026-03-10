import { useState } from 'react';

import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const cyberFont: CSSProperties = {
  fontFamily: "'Oxanium', sans-serif",
  fontWeight: 600,
  fontSize: '13px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  color: '#000',
};

const cyberButton: CSSProperties = {
  ...cyberFont,
  padding: '12px 32px',
  cursor: 'pointer',
  background: 'linear-gradient(135deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.02) 100%)',
  border: '1px solid rgba(0,0,0,0.5)',
  borderRadius: 0,
  transition: 'all 0.25s ease',
  outline: 'none',
  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
  textShadow: '0 0 8px rgba(0,0,0,0.2)',
};

const cyberPanel: CSSProperties = {
  ...cyberFont,
  fontSize: '12px',
  letterSpacing: '0.1em',
  marginTop: '8px',
  padding: '16px 20px',
  border: '1px solid rgba(0,0,0,0.3)',
  background: 'linear-gradient(135deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.01) 100%)',
  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
  boxShadow: '0 0 20px rgba(0,0,0,0.06)',
};

const stageStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700&display=swap');

  @keyframes sprocket-panel-in {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const meta: Meta = {
  title: 'Components/Popover',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: { control: 'boolean' },
    modal: { control: 'boolean' },
  },
  args: {
    defaultOpen: false,
    modal: true,
  },
  decorators: [
    (Story) => (
      <>
        <style>{stageStyle}</style>
        <Story />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Popover is partially implemented — Trigger and Content sub-components
 * are still pending. This story demonstrates the intended state management
 * pattern with native elements standing in for the missing sub-components.
 */
const PopoverDemo = ({ defaultOpen, modal }: { defaultOpen?: boolean; modal?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen ?? false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          ...cyberButton,
          borderColor: isOpen ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)',
          boxShadow: isOpen ? '0 0 15px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        {isOpen ? 'Disengage' : 'Engage'} Panel
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal={modal}
          style={{
            ...cyberPanel,
            animation: 'sprocket-panel-in 0.2s ease-out',
          }}
        >
          Panel active — status: <strong style={{ textShadow: '0 0 8px rgba(0,0,0,0.2)' }}>online</strong>
        </div>
      )}
    </div>
  );
};

export const Default: Story = {
  render: (args) => <PopoverDemo {...args} />,
};
