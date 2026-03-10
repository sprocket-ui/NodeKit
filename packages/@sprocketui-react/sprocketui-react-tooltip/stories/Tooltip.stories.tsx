import { Tooltip } from '@sprocketui-react/tooltip';

import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const cyberFont: CSSProperties = {
  fontFamily: "'Oxanium', sans-serif",
  fontWeight: 600,
  fontSize: '13px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
};

const triggerStyle: CSSProperties = {
  ...cyberFont,
  padding: '10px 24px',
  cursor: 'pointer',
  background: 'linear-gradient(135deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.02) 100%)',
  color: '#000',
  border: '1px solid rgba(0,0,0,0.4)',
  borderRadius: 0,
  transition: 'all 0.25s ease',
  outline: 'none',
  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
  textShadow: '0 0 6px rgba(0,0,0,0.15)',
};

const tooltipContentStyle: CSSProperties = {
  ...cyberFont,
  fontSize: '11px',
  letterSpacing: '0.12em',
  background: 'rgba(0,0,0,0.85)',
  color: 'rgba(255,255,255,0.9)',
  padding: '8px 14px',
  borderRadius: 0,
  border: '1px solid rgba(255,255,255,0.1)',
  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
  textShadow: '0 0 8px rgba(255,255,255,0.2)',
  boxShadow: '0 0 20px rgba(0,0,0,0.3)',
};

const stageStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700&display=swap');
`;

const meta: Meta = {
  title: 'Components/Tooltip',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
  render: () => (
    <Tooltip delay={0} closeDelay={150} shouldCloseOnPress={false}>
      <Tooltip.Trigger>
        <button type="button" style={triggerStyle}>Hover Target</button>
      </Tooltip.Trigger>
      <Tooltip.Content style={tooltipContentStyle}>
        System info
      </Tooltip.Content>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', padding: '60px' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <Tooltip key={placement} delay={0} closeDelay={150} shouldCloseOnPress={false}>
          <Tooltip.Trigger>
            <button type="button" style={triggerStyle}>{placement}</button>
          </Tooltip.Trigger>
          <Tooltip.Content placement={placement} style={tooltipContentStyle}>
            Placed {placement}
          </Tooltip.Content>
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Tooltip delay={0} closeDelay={150} shouldCloseOnPress={false}>
      <Tooltip.Trigger>
        <button type="button" style={triggerStyle}>With Arrow</button>
      </Tooltip.Trigger>
      <Tooltip.Content style={tooltipContentStyle}>
        <Tooltip.Arrow />
        Directional hint
      </Tooltip.Content>
    </Tooltip>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tooltip isDisabled delay={0}>
      <Tooltip.Trigger>
        <button
          type="button"
          style={{
            ...triggerStyle,
            opacity: 0.3,
            cursor: 'not-allowed',
            borderStyle: 'dashed',
          }}
        >
          Tooltip Offline
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content style={tooltipContentStyle}>
        You should not see this
      </Tooltip.Content>
    </Tooltip>
  ),
};
