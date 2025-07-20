export function pathToSlug(path: string) {
	return path.replace("/src/routes/", "").replace(".md", ".html");
}

export function slugToPath(slug: string) {
	return `/src/routes/${slug.replace(".html", ".md")}`;
}
