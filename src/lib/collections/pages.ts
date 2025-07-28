import type { ContentModules } from '$lib/types';

const PREFIX = 'src/lib/content/pages';
const MATCHER = new RegExp('^/' + PREFIX + '/(.*?)\\.md')

export const modules = import.meta.glob("$lib/content/pages/**/*.md") as ContentModules;

export type CollectionParams = { path: string}

export function paramsToPath(path: string): string {
    console.log("slug", path);
    return `/${PREFIX}/${path.replace(/\/$/, "")}.md`;
}

export function pathToParams(path: string): CollectionParams | null {
    let match: RegExpExecArray | null
    if (match = MATCHER.exec(path)) {
        return {
            path: match[1],
        }
    }
    return null;
}

export function pathToURL(path: string): string | null {
    const params: CollectionParams | null = pathToParams(path);
    if (params) {
        return `/${params.path}/`
    } else {
        return null;
    }
}

export async function getModules(): Promise<ContentModules> {
    return modules;
}
