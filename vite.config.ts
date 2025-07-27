import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svelteMd from "vite-plugin-svelte-md";
import mdFootnotes from 'markdown-it-footnote';
import mdAnchors from 'markdown-it-anchor';
import MagicString from 'magic-string';

function stripEmptyScripts() {
	return {
    	name: 'strip-empty-scripts',
		transform: {
			order: 'pre', // puts it before vite-plugin-svelte:compile
			async handler(content: string, filename: string) {
				if (/\.(md)$/.test(filename)) {
					const s = new MagicString(content);
					s.replaceAll(/^<script>\s*<\/script>\s*/g, (_) => "");
					return {
						code: s.toString(),
						map: s.generateMap({ }), 
					}
				}
			}
		}
    }
}

export default defineConfig({
	plugins: [
		svelteMd({
			headId: 'id',
			markdownItUses: [mdFootnotes, mdAnchors]
		}),
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
