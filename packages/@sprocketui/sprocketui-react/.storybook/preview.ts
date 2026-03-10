import './tailwind.css';
import type { Preview } from '@storybook/react';

document.documentElement.style.background = '#000';
document.body.style.background = '#000';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
};

export default preview;
