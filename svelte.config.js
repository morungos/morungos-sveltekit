import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		mdsvex(mdsvexConfig),
		vitePreprocess(), 
	],
	kit: {
		adapter: adapter({ 
			strict: false 
		}),
		prerender: {
			handleHttpError: 'warn'
		}
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
