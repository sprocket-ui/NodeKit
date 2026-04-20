import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: ['src/index.ts'],
	outDir: 'dist',
	format: ['esm', 'cjs'],
	dts: {
		compilerOptions: {
			skipLibCheck: true
		}
	},
	clean: true,
	minify: true,
	external: [
		'esbuild',
		'react',
		'react-dom',
		'react/jsx-runtime',
		/^@necto/,
		/^@necto-react/,
		/^@sprocketui-types/,
		/^@react-aria/,
		/^react-aria/
	]
});
