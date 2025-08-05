import type { ContentModules, LoadedModules, RenderedComponent } from '$lib/types';

import { render } from 'svelte/server';

const PREFIX = 'src/lib/content/pages';
const MATCHER = new RegExp('^/' + PREFIX + '/(.*?)\\.md')

const modules = import.meta.glob("$lib/content/pages/**/*.md") as LoadedModules;

export type CollectionParams = { path: string}

export function paramsToPath(path: string): string {
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

export async function renderModule(id: string): Promise<RenderedComponent> {
    const component = await modules[id]()
    return render(component.default);
}