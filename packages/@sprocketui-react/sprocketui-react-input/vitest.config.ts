import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		globals: true,
		coverage: {
			provider: 'istanbul',
			reporter: ['lcov', 'text'],
			include: ['src/**/*.{ts,tsx}'],
			exclude: ['src/**/*.d.ts']
		},
		testTransformMode: {
			web: ['\\.jsx?$', '\\.tsx?$']
		}
	},
	resolve: {
		alias: [
			{
				find: /^@sprocketui-react\/input\/(.*)$/,
				replacement: path.resolve(__dirname, 'src/$1')
			},
			{
				find: '@sprocketui-react/input',
				replacement: path.resolve(__dirname, 'src/index.ts')
			}
		]
	}
});
