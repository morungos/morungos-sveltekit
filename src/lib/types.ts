import type { Component } from 'svelte';

export type ContentFrontMatter = {
	id: string,
	title?: string;
	card?: string;
	card_alt?: string;
	summary?: string;
	description?: string;
	author?: string;
	words?: number;
	excerpt?: string;
};

export type LayoutData = {
	card: string,
	cardAlt: string,
	title?: string,
	description?: string,
	summary?: string
}

export type RenderedComponent = {
	head: string;
	body: string;
}

export type LoadedModules = Record<
	string,
	() => Promise<{ 
		default: Component; 
		frontmatter: ContentFrontMatter
	}>
>;

export type ContentModules = Record<
	string,
	() => Promise<{ 
		frontmatter: ContentFrontMatter
	}>
>;

export type CollectionItem = {
    id: string;
    url: string | null;
	params: { [key: string]: string };
    frontmatter: ContentFrontMatter;
	component: RenderedComponent
}

export type CollectionSummaryItem = Omit<CollectionItem, "component">;

export type CollectionPage = {
	page: number;
	hasPrevious: boolean;
	previousPage: number;
	hasNext: boolean;
	nextPage: number;
	items: Array<CollectionSummaryItem>
}
