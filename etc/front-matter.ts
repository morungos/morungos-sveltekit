import MagicString from 'magic-string';
import grayMatter from "gray-matter";
import type { PluginOption } from 'vite';
import type { GrayMatterFile } from 'gray-matter';
import { markdownToTxt } from 'markdown-to-txt';

const WORDS_PER_MINUTE = 200

/**
 * A small Vite plugin that removes completely empty script elements
 * when they are at the start of a Markdown file. It should be harmless
 * anyway, but stops the Vite Svelte markdown plugin from messing up
 * front matter.
 * 
 * This plugin also generates a default frontmatter `excerpt` field that, by
 * default, consists of the first paragraph. 
 */

const defaultFrontMatter: { [key: string]: any } = {
	author: 'Stuart'
}

const SCRIPTS_RE = /(<script[^>]*>)([\s\S]*?)<\/script>/gu;
const SVELTE_TAGS_RE = /(<svelte:[a-z][^>]*>)([\s\S]*?)<\/svelte:[a-z]+>/gu;

/**
 * Retrieves an excerpt, Jekyll-style. 
 * 
 * @param parsedFrontmatter 
 * @param text 
 * @returns 
 */
function createExcerpt(parsedFrontmatter: GrayMatterFile<string>, text: string) {
	let excerpt: string | null = null;

	const paragraphs = text.split(/\n\s*\n/)
	if (paragraphs.length > 0) {
		excerpt = paragraphs[0].split(/\s+/).join(" ")
	}

	if (excerpt) {
		parsedFrontmatter.data['excerpt'] = excerpt;
	}
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

	const filtered = parsedFrontmatter.content
		.replaceAll(SVELTE_TAGS_RE, "\n")
		.replaceAll(SCRIPTS_RE, "\n")
		.trim()
	const text = markdownToTxt(filtered).trim()

	const words = text.split(/\s+/).length
	parsedFrontmatter.data['words'] = words;
	
	if (! parsedFrontmatter.data['excerpt']) {
		createExcerpt(parsedFrontmatter, text)
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
