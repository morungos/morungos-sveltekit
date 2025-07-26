import type { PageLoad } from "./$types";

export const prerender = true;
export const ssr = true;

export const load = (async ({ params }) => {
    return { 
        title: "Building technology with craft",
        background: "/src/backgrounds/bg-index.jpg",
    };
}) satisfies PageLoad;
