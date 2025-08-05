import type {
    CollectionPage,
    ContentModules,
    LoadedModules,
    RenderedComponent
} from '$lib/types';

import { render } from 'svelte/server';

const PREFIX = 'src/lib/content/posts';
const MATCHER = new RegExp('^/' + PREFIX + '/(\\d{4,4})-(\\d{2,2})-(\\d{2,2})-(.*?)\\.md')

// The modules themselves
const modules = import.meta.glob("$lib/content/posts/*.md") as LoadedModules;

export type CollectionParams = { year: string, month: string, day: string, slug: string}

export function paramsToPath(year: string, month: string, day: string, slug: string): string {
    return `/${PREFIX}/${year}-${month}-${day}-${slug.replace(/\/$/, "")}.md`;
}

export function pathToParams(path: string): CollectionParams | null {
    let match: RegExpExecArray | null
    if (match = MATCHER.exec(path)) {
        return {
            year: match[1],
            month: match[2],
            day: match[3],
            slug: match[4],
        }
    }
    return null;
}

export function pathToURL(path: string): string | null {
    const params: CollectionParams | null = pathToParams(path);
    if (params) {
        return `/${params.year}/${params.month}/${params.day}/${params.slug}/`
    } else {
        return null;
    }
}

/**
 * Return all the modules -- this is effectively used for generating entries, so it
 * does not need to be quite as performant. The modules themselves are promises, 
 * that is.
 * 
 * @returns a list of content modules
 */
export async function getModules(): Promise<ContentModules> {
    return modules;
}

export async function renderModule(id: string): Promise<RenderedComponent> {
    const component = await modules[id]()
    return render(component.default);
}

export async function getModulePage(pageNumber: number, pageSize: number = 5): Promise<CollectionPage> {

    // Sorts the modules by id -- at this stage, the modules are still promises
    const sorted = Object.entries(modules).sort((a, b) => b[0].localeCompare(a[0]))
    const start = pageNumber * pageSize

    const subset = sorted.slice(start, start + pageSize)

    const pageItems = Object.fromEntries(subset)
    const pageItemIds = Object.keys(pageItems)
    const pageItemLoads = await Promise.all(Object.values(pageItems).map((f) => f()))
    const pageItemURLs = pageItemIds.map((id) => pathToURL(id))
    const pageItemParams = pageItemIds.map((id) => pathToParams(id))

    return {
        page: pageNumber,
        hasPrevious: start > 0,
        previousPage: pageNumber - 1,
        hasNext: (start + pageSize) < sorted.length,
        nextPage: pageNumber + 1,
        items: pageItemIds.map((id, i) => ({
            id: id,
            url: pageItemURLs[i],
            params: pageItemParams[i] ?? {},
            frontmatter: pageItemLoads[i].frontmatter,
        }))
    }
}
