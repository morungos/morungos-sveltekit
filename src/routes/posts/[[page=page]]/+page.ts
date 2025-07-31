import { getModulePage, modules } from "$lib/collections/posts";
import type { PageLoad, EntryGenerator } from "./$types";

const BLOG_PAGE_SIZE = 5;

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

    const page = await getModulePage(pageNumber - 1, BLOG_PAGE_SIZE)
    return { 
        page: page
    }
}) satisfies PageLoad;

/**
 * The EntryGenerator should return all the blog pages, and that should suffice.
 * @returns 
 */
export const entries: EntryGenerator = () => {
    const pageCount = Math.ceil(Object.keys(modules).length / BLOG_PAGE_SIZE);
    const rest: Array<{ page: string | undefined }> = new Array(pageCount).fill(true).map((x, i) => ({ page: 'page' + (i + 1) }))
    return rest.concat([{ page: void 0}]);
};

