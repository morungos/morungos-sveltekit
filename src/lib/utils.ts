export function pathToSlug(path: string) {
	return path.replace(".md", "");
}

export function slugToPath(slug: string) {
	return `${slug.replace(/\/$/, "")}.md`;
}
