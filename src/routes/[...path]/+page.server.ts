import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageServerLoad } from "./$types";
import { getModules, paramsToPath, pathToParams, renderModule } from "$lib/collections/pages";

export const prerender = true;
export const ssr = true;

export const load = (async ({ params }) => {
    const path = paramsToPath(params.path);
    const modules = await getModules();
    const contentModule = modules[path];

    if (!contentModule) {
        error(404, "Can't find content");
    }

    const { frontmatter } = await contentModule();
    const component = await renderModule(path);

    return { 
        component,
        frontmatter,
        title: frontmatter.title,
        card: frontmatter.card,
		cardAlt: frontmatter.card_alt
    };
}) satisfies PageServerLoad;

/**
 * Never needs to render any modules, so we don't need components at all.
 * @returns 
 */
export const entries: EntryGenerator = async () => {
    const modules = await getModules()

    const entries = Object.keys(modules).map((path) => {
        return pathToParams(path);
    }).filter((v) => !!v);

    return entries;
};
