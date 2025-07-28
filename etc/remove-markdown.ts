import removeMarkdownModule from 'markdown-to-text';

export const removeMarkdown = (removeMarkdownModule as unknown as { default: (v: string) => string }).default;
