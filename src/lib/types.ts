import type { Component } from 'svelte';

export type ContentFrontmatter = {
	title: string;
	description: string;
};

export type ContentModules = Record<
	string,
	() => Promise<{ default: Component; frontmatter: ContentFrontmatter }>
>;
