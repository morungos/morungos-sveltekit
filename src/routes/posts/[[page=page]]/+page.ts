import { getModulePage } from "$lib/collections/posts";
import type { PageLoad } from "./$types";

export const prerender = true;
export const ssr = true;

export const load = (async ({ params }) => {

    // The page might be empty, or page2, etc. That gives us a page number which
    // we can use get read a collection. Also, the entries depend on the number
    // within the collection, althere here what we care about more is a next and 
    // previous link.

    const pageRequested = params.page?.replace(/^page/, "")

    let pageNumber = 1
    try {
        pageNumber = parseInt(pageRequested || "1")
    } catch {
        // Do nothing
    }

    const page = await getModulePage(pageNumber - 1, 5)
    return { 
        page: page
    }
}) satisfies PageLoad;

