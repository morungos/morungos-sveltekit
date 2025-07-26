import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svelteMd from "vite-plugin-svelte-md";

function stripEmptyScripts() {
	return {
    	name: 'strip-empty-scripts',
		transform: {
			order: 'pre', // puts it before vite-plugin-svelte:compile
			async handler(content: string, filename: string) {
				return content.replaceAll(/^<script>\s*<\/script>\s*/g, "");
			}
		}
    }
} 

export default defineConfig({
	plugins: [
		svelteMd(),
		enhancedImages(),
		stripEmptyScripts(),
		sveltekit(),
	],
	test: {
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					environment: 'browser',
					browser: {
						enabled: true,
						headless: true,
						provider: 'playwright',
						instances: [{ browser: 'chromium' }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			},
		]
	}
});
