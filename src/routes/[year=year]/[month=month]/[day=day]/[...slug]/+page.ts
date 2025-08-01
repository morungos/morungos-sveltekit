import type { ContentModules } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageLoad } from "./$types";
import { getModules, paramsToPath, pathToParams } from "$lib/collections/posts";

export const prerender = true;
export const ssr = true;

export const load = (async ({ params }) => {
	const path = paramsToPath(params.year, params.month, params.day, params.slug);
	const modules = await getModules();
	const contentModule = modules[path];

	if (!contentModule) {
		error(404, "Can't find content");
	}

	const { default: component, frontmatter } = await contentModule().then();

	return { 
        component, 
        frontmatter,
        title: frontmatter.title,
		card: frontmatter.card,
		cardAlt: frontmatter.card_alt
    };
}) satisfies PageLoad;

export const entries: EntryGenerator = async () => {
	const modules = await getModules()

	const entries = Object.keys(modules).map((path) => {
		return pathToParams(path);
	}).filter((v) => !!v);

	return entries;
};

