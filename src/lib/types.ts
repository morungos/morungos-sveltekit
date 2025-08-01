import type { Component } from 'svelte';

export type ContentFrontMatter = {
	id: string,
	title?: string;
	card?: string;
	description?: string;
	author?: string;
	words?: number;
	excerpt?: string;
};

export type ContentModules = Record<
	string,
	() => Promise<{ default: Component; frontmatter: ContentFrontMatter }>
>;

export type CollectionItem = {
    id: string;
    url: string | null;
	params: { [key: string]: string };
    frontmatter: ContentFrontMatter;
    component: Component;
}

export type CollectionPage = {
	page: number;
	hasPrevious: boolean;
	previousPage: number;
	hasNext: boolean;
	nextPage: number;
	items: Array<CollectionItem>
}
