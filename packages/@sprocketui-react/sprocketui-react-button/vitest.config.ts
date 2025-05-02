import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import '@testing-library/jest-dom'; // Import the setup script directly

export default defineConfig({
  plugins: [
    react()
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    testTransformMode: {
      web: ['\\.jsx?$', '\\.tsx?$'],
    },
  },
});