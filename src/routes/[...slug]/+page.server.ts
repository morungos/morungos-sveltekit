import type { ContentModules } from "$lib/types.js";
import { pathToSlug, slugToPath } from "$lib/utils.js";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageServerLoad } from "./$types";
import FusionCollection from 'fusionable/FusionCollection';

export const prerender = "auto";
export const ssr = true;

export const load = (async ({ params }) => {
	const collection = new FusionCollection().loadFromDir('src/content', true);
	const path = slugToPath(params.slug)
	const post = collection.getOneByFilename(path);

	if (!post) {
		throw new Error('Post not found');
	}

	return { post: post.getItem() };

}) satisfies PageServerLoad;

export const entries: EntryGenerator = async () => {
	const collection = new FusionCollection()
		.loadFromDir('src/content', true)
		.orderBy('date', 'desc');

	const posts = collection.getItemsArray();
	return posts.map((path) => {
		return { slug: pathToSlug(path) };
	});
};
