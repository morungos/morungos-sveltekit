export function pathToSlug(path: string) {
	return path.replace("/src/routes/", "").replace(".md", "");
}

export function slugToPath(slug: string) {
	return `/src/routes/${slug}.md`;
}
