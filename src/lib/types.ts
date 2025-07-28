import type { Component } from 'svelte';

export type ContentFrontMatter = {
	id: string,
	title?: string;
	description?: string;
	author?: string,
	words?: number
};

export type ContentModules = Record<
	string,
	() => Promise<{ default: Component; frontmatter: ContentFrontMatter }>
>;

export type CollectionItem = {
    id: string;
    url: string | null;
    frontmatter: ContentFrontMatter;
    component: Component;
}
