import type { LayoutLoad } from "./$types";
import type { LayoutData } from "$lib/types";

export const trailingSlash = 'always';
export const prerender = true;
export const ssr = true;

export const load = (async () => {
    const layoutData: LayoutData = { 
        card: 'bg-about.jpg',
        cardAlt: 'Generic image description',
    };

	return layoutData;
}) satisfies LayoutLoad;
