import { useState } from 'react';

import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const cyberFont: CSSProperties = {
  fontFamily: "'Share Tech Mono', monospace",
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  color: '#fff',
};

const stageStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

  .cyber-checkbox {
    position: relative;
    width: 22px;
    height: 22px;
    min-width: 22px;
    clip-path: polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px));
    border: 1px solid rgba(255,255,255,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.25s ease, transform 0.25s ease;
    transform: scale(1);
  }

  .cyber-checkbox.checked {
    border-color: #fff;
    transform: scale(1.15);
  }

  /* Center fill */
  .cyber-checkbox .fill {
    width: 6px;
    height: 6px;
    background: #fff;
    transform: scale(0);
    transition: transform 0.2s ease;
  }
  .cyber-checkbox.checked .fill {
    transform: scale(1);
  }
`;

const CyberCheck = ({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) => (
  <label
    style={{
      ...cyberFont,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      userSelect: 'none',
    }}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
    />
    <div className={`cyber-checkbox ${checked ? 'checked' : ''}`}>
      <div className="fill" />
    </div>
    <span
      style={{
        color: checked ? '#fff' : 'rgba(255,255,255,0.45)',
        textShadow: checked ? '0 0 10px rgba(255,255,255,0.15)' : 'none',
        transition: 'color 0.25s ease',
      }}
    >
      {label}
    </span>
  </label>
);

const meta: Meta = {
  title: 'Components/Checkbox',
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

const CheckboxDemo = () => {
  const [checked, setChecked] = useState(false);
  return <CyberCheck checked={checked} onChange={setChecked} label="Activate" />;
};

export const Default: Story = {
  render: () => <CheckboxDemo />,
};

const CheckboxGroupDemo = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const options = ['Neural-Link', 'Optic-HUD', 'Reflex-Boost'];
  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <div>
      <div
        style={{
          ...cyberFont,
          fontSize: '10px',
          letterSpacing: '0.25em',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '12px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          paddingBottom: '8px',
        }}
      >
        Augmentation Suite
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '260px' }}>
        {options.map((option) => (
          <CyberCheck
            key={option}
            checked={selected.includes(option)}
            onChange={() => toggle(option)}
            label={option}
          />
        ))}
      </div>
      <div
        style={{
          ...cyberFont,
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.3)',
          marginTop: '14px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '10px',
        }}
      >
        Online: {selected.length ? selected.join(' / ') : '—'}
      </div>
    </div>
  );
};

export const CheckboxGroup: Story = {
  render: () => <CheckboxGroupDemo />,
};
