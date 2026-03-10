import { Tabs } from '@sprocketui-react/tabs';

import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const cyberFont: CSSProperties = {
  fontFamily: "'Oxanium', sans-serif",
  fontWeight: 600,
  fontSize: '12px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
};

const tabStyle: CSSProperties = {
  ...cyberFont,
  padding: '10px 20px',
  border: 'none',
  borderBottom: '2px solid transparent',
  background: 'none',
  cursor: 'pointer',
  color: 'rgba(0,0,0,0.4)',
  transition: 'all 0.25s ease',
  outline: 'none',
};

const listStyle: CSSProperties = {
  display: 'flex',
  borderBottom: '1px solid rgba(0,0,0,0.15)',
};

const panelStyle: CSSProperties = {
  ...cyberFont,
  fontSize: '13px',
  letterSpacing: '0.1em',
  padding: '20px 16px',
  color: 'rgba(0,0,0,0.6)',
};

const containerStyle: CSSProperties = {
  width: '440px',
  border: '1px solid rgba(0,0,0,0.12)',
  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
};

const stageStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700&display=swap');

  @keyframes sprocket-tab-underline {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
`;

const selectedSpan = (label: string, isSelected: boolean): React.ReactElement => (
  <span
    style={{
      color: isSelected ? '#000' : 'rgba(0,0,0,0.4)',
      textShadow: isSelected ? '0 0 10px rgba(0,0,0,0.15)' : 'none',
      transition: 'all 0.25s ease',
    }}
  >
    {label}
  </span>
);

const meta: Meta = {
  title: 'Components/Tabs',
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
    <Tabs defaultSelectedValue="tab1" style={containerStyle}>
      <Tabs.List aria-label="System modules" style={listStyle}>
        <Tabs.Tab value="tab1" style={tabStyle}>
          {({ isSelected }: { isSelected: boolean }) => selectedSpan('Module-A', isSelected)}
        </Tabs.Tab>
        <Tabs.Tab value="tab2" style={tabStyle}>
          {({ isSelected }: { isSelected: boolean }) => selectedSpan('Module-B', isSelected)}
        </Tabs.Tab>
        <Tabs.Tab value="tab3" style={tabStyle}>
          {({ isSelected }: { isSelected: boolean }) => selectedSpan('Module-C', isSelected)}
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="tab1" style={panelStyle}>Module-A subsystem active. All processes nominal.</Tabs.Panel>
        <Tabs.Panel value="tab2" style={panelStyle}>Module-B diagnostics loaded. Awaiting input.</Tabs.Panel>
        <Tabs.Panel value="tab3" style={panelStyle}>Module-C interface standby. Ready for deployment.</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultSelectedValue="tab1" orientation="vertical" style={{ ...containerStyle, display: 'flex' }}>
      <Tabs.List
        aria-label="Vertical modules"
        style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(0,0,0,0.15)', minWidth: '140px' }}
      >
        <Tabs.Tab value="tab1" style={{ ...tabStyle, borderBottom: 'none', borderRight: '2px solid transparent', textAlign: 'left' }}>
          {({ isSelected }: { isSelected: boolean }) => selectedSpan('Sector-1', isSelected)}
        </Tabs.Tab>
        <Tabs.Tab value="tab2" style={{ ...tabStyle, borderBottom: 'none', borderRight: '2px solid transparent', textAlign: 'left' }}>
          {({ isSelected }: { isSelected: boolean }) => selectedSpan('Sector-2', isSelected)}
        </Tabs.Tab>
        <Tabs.Tab value="tab3" style={{ ...tabStyle, borderBottom: 'none', borderRight: '2px solid transparent', textAlign: 'left' }}>
          {({ isSelected }: { isSelected: boolean }) => selectedSpan('Sector-3', isSelected)}
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels style={{ flex: 1 }}>
        <Tabs.Panel value="tab1" style={panelStyle}>Sector-1 perimeter secure.</Tabs.Panel>
        <Tabs.Panel value="tab2" style={panelStyle}>Sector-2 scanning in progress.</Tabs.Panel>
        <Tabs.Panel value="tab3" style={panelStyle}>Sector-3 awaiting clearance.</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultSelectedValue="tab1" style={containerStyle}>
      <Tabs.List aria-label="Tabs with restricted" style={listStyle}>
        <Tabs.Tab value="tab1" style={tabStyle}>
          {({ isSelected }: { isSelected: boolean }) => selectedSpan('Access-1', isSelected)}
        </Tabs.Tab>
        <Tabs.Tab value="tab2" isDisabled style={{ ...tabStyle, opacity: 0.25, cursor: 'not-allowed' }}>
          {() => <span style={{ color: 'rgba(0,0,0,0.2)' }}>Restricted</span>}
        </Tabs.Tab>
        <Tabs.Tab value="tab3" style={tabStyle}>
          {({ isSelected }: { isSelected: boolean }) => selectedSpan('Access-3', isSelected)}
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="tab1" style={panelStyle}>Access-1 granted. Proceed.</Tabs.Panel>
        <Tabs.Panel value="tab2" style={panelStyle}>Classified — clearance required.</Tabs.Panel>
        <Tabs.Panel value="tab3" style={panelStyle}>Access-3 granted. Proceed.</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

export const ManualActivation: Story = {
  render: () => (
    <div>
      <p style={{ ...cyberFont, fontSize: '10px', color: 'rgba(0,0,0,0.35)', marginBottom: '12px', letterSpacing: '0.2em' }}>
        Arrow keys to navigate — Enter/Space to confirm
      </p>
      <Tabs defaultSelectedValue="tab1" activationMode="manual" style={containerStyle}>
        <Tabs.List aria-label="Manual activation" style={listStyle}>
          <Tabs.Tab value="tab1" style={tabStyle}>
            {({ isSelected }: { isSelected: boolean }) => selectedSpan('Channel-1', isSelected)}
          </Tabs.Tab>
          <Tabs.Tab value="tab2" style={tabStyle}>
            {({ isSelected }: { isSelected: boolean }) => selectedSpan('Channel-2', isSelected)}
          </Tabs.Tab>
          <Tabs.Tab value="tab3" style={tabStyle}>
            {({ isSelected }: { isSelected: boolean }) => selectedSpan('Channel-3', isSelected)}
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="tab1" style={panelStyle}>Channel-1 — manual confirmation required.</Tabs.Panel>
          <Tabs.Panel value="tab2" style={panelStyle}>Channel-2 — manual confirmation required.</Tabs.Panel>
          <Tabs.Panel value="tab3" style={panelStyle}>Channel-3 — manual confirmation required.</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </div>
  ),
};
