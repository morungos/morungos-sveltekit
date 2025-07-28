import MagicString from 'magic-string';
import grayMatter from "gray-matter";
import type { PluginOption } from 'vite';
import { removeMarkdown } from './remove-markdown.js';

const WORDS_PER_MINUTE = 200;

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

	const text = removeMarkdown(parsedFrontmatter.content).trim()
	const words = text.split(/\s+/).length
	parsedFrontmatter.data['words'] = words;
	
	if (! parsedFrontmatter.data['excerpt']) {
		const paragraphs = text.split(/\n\s*\n/)
		if (paragraphs.length > 0) {
			const firstWords = paragraphs[0].split(/\s+/).join(" ")
			parsedFrontmatter.data['excerpt'] = firstWords
		}
	}

	parsedFrontmatter.data = {...defaultFrontMatter, ...parsedFrontmatter.data};
	const reformatted = grayMatter.stringify(parsedFrontmatter.content, parsedFrontmatter.data)
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
