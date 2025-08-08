import { getModulePage } from "$lib/collections/posts";
import type { PageLoad } from "./$types";

export const prerender = true;
export const ssr = true;

/**
 * Generates the data needed to render the front page. In practice, this means we
 * need the Vited markdown files, as well as some additional data such as the 
 * URLs, which we need to get from the collection and the file identifiers.
 */
export const load = (async ({ params: _params }) => {
    const page = await getModulePage(0, 2)
    return { 
        title: "Building technology with craft",
        card: "bg-index.jpg",
        cardAlt: "A moody sunset scene of a sandy beach",
        posts: page
    };
}) satisfies PageLoad;
