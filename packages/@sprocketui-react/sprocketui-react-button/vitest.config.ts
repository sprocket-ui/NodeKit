import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

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
  resolve: {
    alias: [
      {
        find: /^@sprocketui-react\/button\/(.*)$/,
        replacement: path.resolve(__dirname, 'src/$1')
      },
      {
        find: '@sprocketui-react/button',
        replacement: path.resolve(__dirname, 'src/index.ts')
      }
    ]
  },
});