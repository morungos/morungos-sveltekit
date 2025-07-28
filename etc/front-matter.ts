import MagicString from 'magic-string';
import grayMatter from "gray-matter";
import type { PluginOption } from 'vite';

/**
 * A small Vite plugin that removes completely empty script elements
 * when they are at the start of a Markdown file. It should be harmless
 * anyway, but stops the Vite Svelte markdown plugin from messing up
 * front matter.
 */

const defaultFrontMatter: { [key: string]: any } = {
	author: 'Stuart'
}

function preprocess(id: string, content: string) {
	const s = new MagicString(content);
	const parsedFrontmatter = grayMatter(content, {
		excerpt: true
	});

	// Now, we can do a few things, like pick up an excerpt and a word
	// count, and inject them into front matter. We can also add some 
	// default frontmatter, which we should allow to set from configuration.
	//
	// The simple version is to replace the old front matter with a new
	// block, and that's about all.

	if (parsedFrontmatter.excerpt) {
		parsedFrontmatter.data['excerpt'] = parsedFrontmatter.excerpt
	}
	parsedFrontmatter.data['words'] = 100;

	parsedFrontmatter.data = {...defaultFrontMatter, ...parsedFrontmatter.data};
	const reformatted = grayMatter.stringify(parsedFrontmatter.content, parsedFrontmatter.data)
	console.log(reformatted);

	return {
		code: reformatted, 
		map: null
	}
}

export function frontMatterCompleter() {
	return {
    	name: 'front-matter-completer',
		enforce: "pre",
		transform(raw, id) {
			if (! /\.(md)$/.test(id)) {
				return undefined;
			}
			try {
				return preprocess(id, raw);
			} catch (e: any) {
				this.error(e);
			}
			return undefined;
		},
		handleHotUpdate(ctx) {
			if (! /\.(md)$/.test(ctx.file)) {
				return undefined;
			}

			const defaultRead = ctx.read;
			ctx.read = async function () {
				return preprocess(ctx.file, await defaultRead())?.code;
			};
		},
    } as PluginOption
}
