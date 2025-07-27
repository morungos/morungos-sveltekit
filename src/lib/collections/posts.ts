import type { ContentModules } from '$lib/types';

const PREFIX = 'src/lib/content/posts';
const MATCHER = new RegExp('^/' + PREFIX + '/(\\d{4,4})-(\\d{2,2})-(\\d{2,2})-(.*?)\\.md')

export const modules = import.meta.glob("$lib/content/posts/*.md") as ContentModules;

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

export async function getModules(): Promise<ContentModules> {
    return modules;
}

export async function getModulePage(pageNumber: number, pageSize: number = 5): Promise<ContentModules> {
    const sorted = Object.entries(modules).sort((a, b) => b[0].localeCompare(a[0]))
    const start = pageNumber * pageSize
    const subset = sorted.slice(start, start + pageSize)

    return Object.fromEntries(subset)
}
