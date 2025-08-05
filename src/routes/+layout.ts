import type { LayoutLoad } from "./$types";

export const trailingSlash = 'always';
export const prerender = true;
export const ssr = true;

export const load = (async () => {
    const layoutData: {
        card: string,
        cardAlt: string,
        title?: string,
        description?: string
    } = { 
        card: 'bg-about.jpg',
        cardAlt: 'Generic image description',
    };

	return layoutData;
}) satisfies LayoutLoad;
