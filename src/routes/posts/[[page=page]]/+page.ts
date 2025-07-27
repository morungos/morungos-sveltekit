import type { PageLoad } from "./$types";

export const prerender = true;
export const ssr = true;

export const load = (async ({ params }) => {

    // The page might be empty, or page2, etc. That gives us a page number which
    // we can use get read a collection. Also, the entries depend on the number
    // within the collection, althere here what we care about more is a next and 
    // previous link.

    return { 
        page: params.page
    }
}) satisfies PageLoad;
