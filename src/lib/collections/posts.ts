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

export async function getModules(): Promise<ContentModules> {
    return modules;
}
