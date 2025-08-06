import type { ContentModules } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageServerLoad, RouteParams } from "./$types";
import { getModuleDate, getModules, paramsToPath, pathToParams, renderModule } from "$lib/collections/posts";

export const prerender = true;
export const ssr = true;

export const load = (async ({ params }) => {
	const path = paramsToPath(params.year, params.month, params.day, params.slug);
	const modules = await getModules();
	const contentModule = modules[path];

	const date = getModuleDate(path);

	if (!contentModule) {
		error(404, "Can't find content");
	}

	const { frontmatter } = await contentModule().then();
	const component = await renderModule(path);

	let minutes: number;
	try {
		minutes = Math.ceil((frontmatter.words ?? 0) / 200);
	} catch{
		minutes = 0
	}

	return { 
        component, 
        frontmatter,
        title: frontmatter.title,
		card: frontmatter.card,
		cardAlt: frontmatter.card_alt,
		subheading: `${frontmatter.author} • ${date} ${
			(frontmatter.words) ? ("• " + minutes + " minute" + ((frontmatter.words > 1) ? "s" : "") + " read") : ""
		}`,
    };
}) satisfies PageServerLoad;

export const entries: EntryGenerator = async () => {
	const modules = await getModules()

	const entries = Object.keys(modules).map((path) => {
		return pathToParams(path);
	}).filter((v) => !!v);

	return entries;
};

