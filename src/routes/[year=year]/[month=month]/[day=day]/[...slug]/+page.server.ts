import { pathToBlogParams, blogParamsToPath } from "$lib/utils.js";
import type { EntryGenerator, PageServerLoad } from "./$types";
import FusionCollection from 'fusionable/FusionCollection';
import Showdown from 'showdown';

const converter = new Showdown.Converter();

export const prerender = true;
export const ssr = true;

export const load = (async ({ params }) => {
	const collection = new FusionCollection().loadFromDir('src/content/posts', true);
	const path = blogParamsToPath(params.year, params.month, params.day, params.slug);
	console.log("blog slug", params, path)

	const post = collection.getOneByFilename(path);

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
		.loadFromDir('src/content/posts', true);

	const posts = collection.getItemsArray();
	return posts.map((path) => {
		return { slug: pathToSlug(path) };
	});
};
