import type { ContentModules } from "$lib/types";
import { pathToSlug } from "$lib/utils";
import type { LayoutLoad } from "./$types";

export const trailingSlash = 'always';
export const prerender = true;
export const ssr = true;

export const load = (async () => {
	const modules = import.meta.glob("/src/content/**/*.md") as ContentModules;

	let slugList = Object.keys(modules).map((path) => {
		return { slug: pathToSlug(path) };
	});

	slugList = slugList.sort((a, b) => a.slug.localeCompare(b.slug));

    const layoutData: {
        slugList: Array<{slug: string}>,
        card: string,
        cardAlt: string,
        title?: string,
        description?: string
    } = { 
        slugList,
        card: 'bg-about.jpg',
        cardAlt: 'Generic image description',
    };

	return layoutData;
}) satisfies LayoutLoad;
