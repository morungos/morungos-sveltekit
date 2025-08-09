import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svelteMd from "vite-plugin-svelte-md";
import mdTableOfContents from 'markdown-it-table-of-contents';
import mdFootnotes from 'markdown-it-footnote';
import mdAnchors from 'markdown-it-anchor';
import mdAttrs from 'markdown-it-attrs';
import { stripEmptyScripts } from './etc/strip-empty.js';
import { frontMatterCompleter } from './etc/front-matter.js';
import type { PluginOption } from 'vite';

export default defineConfig({
	plugins: [
		frontMatterCompleter(),
		svelteMd({
			headId: 'id',
			headEnabled: false,
			markdownItOptions: {
				typographer: true,
			},
			markdownItUses: [
                [ mdTableOfContents, {
					includeLevel: [2]
				}],
				mdFootnotes, 
				mdAnchors, 
				[ mdAttrs, {
					leftDelimiter: '[[',
					rightDelimiter: ']]',
				}]
 			]
		}) as PluginOption,
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
