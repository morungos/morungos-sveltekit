import { join } from 'path'

import FusionCollection from 'fusionable/FusionCollection';
import type FusionItem from 'fusionable/FusionItem';

const PREFIX = 'src/content/pages';

export const collection = new FusionCollection().loadFromDir(PREFIX, true);
const items = collection.getItems()

/**
 * Converts a page path to a slug
 * @param path 
 * @returns 
 */
export function pathToSlug(path: string) {
	return path.replace(".md", "");
}

/**
 * Converts a slug back to a page path
 * @param slug 
 * @returns 
 */
export function slugToPath(slug: string) {
	return `${slug.replace(/\/$/, "")}.md`;
}

/**
 * 
 * @param filename 
 * @returns 
 */
export function getItemByFilename(filename: string): FusionItem | null {
    
    const item = items.find((element) => element.getSource() === join(PREFIX, filename))
    return item || null;
}

