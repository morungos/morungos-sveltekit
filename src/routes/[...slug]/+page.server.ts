import type { ContentModules } from "$lib/types.js";
import { pathToSlug, slugToPath } from "$lib/utils.js";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageServerLoad } from "./$types";
import FusionCollection from 'fusionable/FusionCollection';
import Showdown from 'showdown';

const converter = new Showdown.Converter();

export const load = (async ({ params }) => {
	const collection = new FusionCollection().loadFromDir('src/content', true);
	const path = slugToPath(params.slug)
	const post = collection.getOneByFilename(path);

	console.log("path", path, post)

	if (!post) {
		throw new Error('Post not found');
	}

	return { 
		post: post.getItem(),
		content: converter.makeHtml(post.getItem().content)
	};

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
