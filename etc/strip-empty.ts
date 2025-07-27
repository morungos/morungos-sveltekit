import MagicString from 'magic-string';
import type { PluginOption } from 'vite';

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
