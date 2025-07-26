import type { ContentModules } from '$lib/types';

const PREFIX = 'src/lib/content/posts';

export const modules = import.meta.glob("$lib/content/posts/*.md") as ContentModules;

export function paramsToPath(year: string, month: string, day: string, slug: string): string {
    return `/${PREFIX}/${year}-${month}-${day}-${slug.replace(/\/$/, "")}.md`;
}
