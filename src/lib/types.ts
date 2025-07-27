import type { Component } from 'svelte';

export type ContentFrontMatter = {
	id: string,
	title?: string;
	description?: string;
};

export type ContentModules = Record<
	string,
	() => Promise<{ default: Component; frontmatter: ContentFrontMatter }>
>;
