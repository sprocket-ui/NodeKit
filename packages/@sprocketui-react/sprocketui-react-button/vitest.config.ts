import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    testTransformMode: {
      web: ['\\.jsx?$', '\\.tsx?$']
    }
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
  }
});
