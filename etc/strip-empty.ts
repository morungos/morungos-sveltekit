import MagicString from 'magic-string';
import type { PluginOption } from 'vite';

/**
 * A small Vite plugin that removes completely empty script elements
 * when they are at the start of a Markdown file. It should be harmless
 * anyway, but stops the Vite Svelte markdown plugin from messing up
 * front matter.
 */

export function stripEmptyScripts() {
	return {
    	name: 'strip-empty-scripts',
		transform: {
			order: 'pre', // puts it before vite-plugin-svelte:compile
			async handler(content: string, filename: string) {
				if (/\.(md)$/.test(filename)) {
					const s = new MagicString(content);
					s.replaceAll(/^<script>\s*<\/script>\s*/g, (_) => "");
					return {
						code: s.toString(),
						map: s.generateMap({ }), 
					}
				} else {
                    return {
                        code: content,
                        map: null
                    }
                }
			}
		}
    } as PluginOption
}
