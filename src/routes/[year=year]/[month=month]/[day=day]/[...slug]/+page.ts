import type { ContentModules } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageLoad } from "./$types";
import { paramsToPath } from "$lib/collections/posts";

import { modules } from '$lib/collections/posts';

export const prerender = true;
export const ssr = true;

export const load = (async ({ params }) => {
	const path = paramsToPath(params.year, params.month, params.day, params.slug);
	console.log("search", modules, path)
	const contentModule = modules[path];

	if (!contentModule) {
		error(404, "Can't find content");
	}

	console.log("CM", path, await contentModule().then())

	const { default: component, frontmatter } = await contentModule().then();

	console.log("fm", frontmatter)

	return { 
        component, 
        frontmatter,
        title: frontmatter.title,
    };
}) satisfies PageLoad;

export const entries: EntryGenerator = async () => {
	const modules = import.meta.glob("/src/content/**/*.md") as ContentModules;

	const entries = Object.keys(modules).map((path) => {
		return { slug: pathToSlug(path) };
	});

	return entries;
};

