import { getModulePage, pathToParams } from "$lib/collections/posts";
import type { PageLoad } from "./$types";

export const prerender = true;
export const ssr = true;

/**
 * Generates the data needed to render the front page. In practice, this means we
 * need the Vited markdown files, as well as some additional data such as the 
 * URLs, which we need to get from the collection and the file identifiers.
 */
export const load = (async ({ params }) => {
    const latestPostModules = await getModulePage(0, 2)
    const latestPostIds = Object.keys(latestPostModules)
    const latestPostLoads = Promise.all(Object.values(latestPostModules).map((f) => f()))
    const latestPostParams = Object.fromEntries(
        latestPostIds.map((id) => [ id, pathToParams(id) ])
    )
    return { 
        title: "Building technology with craft",
        background: "/src/backgrounds/bg-index.jpg",
        posts: await latestPostLoads,
        postParams: latestPostParams
    };
}) satisfies PageLoad;
