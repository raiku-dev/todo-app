/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		rollupOptions: {
			input: {
				index: resolve(__dirname, 'index.html'),
				dashboard: resolve(__dirname, 'dashboard.html')
			}
		}
	}
});
