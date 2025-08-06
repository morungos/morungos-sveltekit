import { getModulePage, getModules } from "$lib/collections/posts";
import type { PageServerLoad, EntryGenerator } from "./$types";

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
        page: page,
        title: "Posts" + ((pageNumber > 1) ? ` (page ${pageNumber})` : ""),
        card: 'bg-about.jpg',
        cardAlt: `Sun reflecting off a distant coastline, showing bands of bright light against a dark shore`,
        summary: `Page ${pageNumber} of the blog post index`,
        description: `Page ${pageNumber} of the blog post index`,
    }
}) satisfies PageServerLoad;

/**
 * The EntryGenerator should return all the blog pages, and that should suffice.
 * Note, we do not even need to resolve the promises on the modukes themselves, 
 * or render them. The identifiers are enough to compute a page list.
 * 
 * @returns 
 */
export const entries: EntryGenerator = async () => {
    const modules = getModules();
    const pageCount = Math.ceil(Object.keys(modules).length / BLOG_PAGE_SIZE);
    const rest: Array<{ page: string | undefined }> = 
        new Array(pageCount)
            .fill(true)
            .map((x, i) => ({ page: 'page' + (i + 1) }))
    return rest.concat([{ page: void 0}]);
};

