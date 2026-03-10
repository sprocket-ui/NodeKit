import { Label } from '@sprocketui-react/label';

import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const cyberLabel: CSSProperties = {
  fontFamily: "'Oxanium', sans-serif",
  fontWeight: 600,
  fontSize: '11px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.6)',
  textShadow: '0 0 6px rgba(255,255,255,0.1)',
};

const cyberInput: CSSProperties = {
  fontFamily: "'Oxanium', sans-serif",
  fontWeight: 600,
  padding: '12px 20px',
  fontSize: '13px',
  letterSpacing: '0.1em',
  color: '#fff',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: 0,
  outline: 'none',
  transition: 'all 0.25s ease',
  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
};

const stageStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700&display=swap');

  input:focus {
    border-color: rgba(255,255,255,0.7) !important;
    box-shadow: 0 0 15px rgba(255,255,255,0.08), 0 0 40px rgba(255,255,255,0.03) !important;
  }

  input::placeholder {
    font-family: 'Oxanium', sans-serif;
    color: rgba(255,255,255,0.25);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'System Label',
    style: cyberLabel,
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

export const WithInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <Label htmlFor="input-demo" style={cyberLabel}>
        Username
      </Label>
      <input
        id="input-demo"
        type="text"
        placeholder="Enter callsign"
        style={cyberInput}
      />
    </div>
  ),
};
