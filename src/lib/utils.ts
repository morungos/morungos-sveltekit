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
 * For compatibility with Jekyll, blog slugs are handled differently. 
 * The date components are transformed into directories.
 */

/**
 * Converts a slug back to a page path
 * @param slug 
 * @returns 
 */
export function blogParamsToPath(year: string, month: string, day: string, slug: string) {
	return `${year}-${month}-${day}-${slug.replace(/\/$/, "")}.md`;
}

export function pathToBlogParams(path: string) {
    return path.replaceAll(/(\d+){2,4}\//g, '$1-').replace(".md", "");
}