import { Input } from '@sprocketui-react/input';

import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const cyberInput: CSSProperties = {
  fontFamily: "'Share Tech Mono', monospace",
  fontWeight: 400,
  padding: '10px 16px',
  fontSize: '12px',
  letterSpacing: '0.1em',
  color: '#fff',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  borderRadius: 0,
  outline: 'none',
  transition: 'border-color 0.2s ease, background 0.2s ease',
  width: '260px',
  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
};

const stageStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

  input::placeholder {
    font-family: 'Share Tech Mono', monospace;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-size: 11px;
  }

  input:focus {
    border-color: rgba(255,255,255,0.6) !important;
    background: rgba(255, 255, 255, 0.06) !important;
  }
`;

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
  },
  args: {
    placeholder: 'Enter data...',
    style: cyberInput,
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

export const Default: Story = {};
