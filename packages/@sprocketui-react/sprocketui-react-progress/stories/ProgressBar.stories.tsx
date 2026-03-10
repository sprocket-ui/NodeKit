import { ProgressBar } from '@sprocketui-react/progress';

import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const cyberFont: CSSProperties = {
  fontFamily: "'Oxanium', sans-serif",
  fontWeight: 600,
  fontSize: '11px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  color: 'rgba(0,0,0,0.5)',
};

const trackStyle: CSSProperties = {
  width: '320px',
  height: '6px',
  background: 'rgba(0,0,0,0.06)',
  borderRadius: 0,
  overflow: 'hidden' as const,
  border: '1px solid rgba(0,0,0,0.1)',
  clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
};

const fillBase: CSSProperties = {
  height: '100%',
  background: 'linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.4) 100%)',
  transition: 'width 200ms ease',
};

const stageStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700&display=swap');

  @keyframes sprocket-indeterminate {
    0% { margin-left: 0; opacity: 0.3; }
    50% { margin-left: 60%; opacity: 1; }
    100% { margin-left: 0; opacity: 0.3; }
  }

  @keyframes sprocket-hung-pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
`;

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    isIndeterminate: { control: 'boolean' },
  },
  args: {
    value: 45,
    style: trackStyle,
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

export const Default: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
      <span style={cyberFont}>System Load</span>
      <ProgressBar
        {...args}
        label="Loading…"
        style={trackStyle}
      >
        {({ percentage }: { percentage: number }) => (
          <div
            style={{
              ...fillBase,
              width: `${percentage}%`,
            }}
          />
        )}
      </ProgressBar>
      <span style={{ ...cyberFont, fontSize: '10px', color: 'rgba(0,0,0,0.35)' }}>{args.value}% Capacity</span>
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
      <span style={cyberFont}>Syncing</span>
      <ProgressBar
        {...args}
        label="Loading…"
        style={trackStyle}
      >
        {({ isIndeterminate }: { isIndeterminate: boolean }) => (
          <div
            style={{
              width: isIndeterminate ? '40%' : '0%',
              height: '100%',
              background: 'rgba(0,0,0,0.3)',
              animation: isIndeterminate ? 'sprocket-indeterminate 1.5s ease-in-out infinite' : 'none',
            }}
          />
        )}
      </ProgressBar>
    </div>
  ),
};

export const HungDetection: Story = {
  args: {
    value: 30,
    hungTimeout: 2000,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
      <span style={cyberFont}>Upload Stream</span>
      <ProgressBar
        {...args}
        label="Upload"
        style={trackStyle}
      >
        {({ percentage, isHung }: { percentage: number; isHung: boolean }) => (
          <div
            style={{
              width: `${percentage}%`,
              height: '100%',
              background: isHung
                ? 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)'
                : fillBase.background,
              transition: 'width 200ms ease, background 200ms ease',
              animation: isHung ? 'sprocket-hung-pulse 1s ease-in-out infinite' : 'none',
            }}
          />
        )}
      </ProgressBar>
      <span style={{ ...cyberFont, fontSize: '10px', color: isHung ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.35)' }}>
        Hold value 2s to trigger hung state
      </span>
    </div>
  ),
};
