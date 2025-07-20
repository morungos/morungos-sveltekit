export function pathToSlug(path: string) {
	return path.replace("/src/content/", "").replace(".md", ".html");
}

export function slugToPath(slug: string) {
	return `/src/content/${slug.replace(".html", ".md")}`;
}
