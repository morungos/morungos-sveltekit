import type { ContentModules } from "./types";

/**
 * A single module which exports alll the Markdown content as a mapping 
 * from slugs to ContentModules.
 */
export default import.meta.glob("/src/content/**/*.md") as ContentModules;
