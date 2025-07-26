<script lang="ts">
import '$lib/content-styles.css';
import type { PageData } from './$types.js';

export const prerender = true;
export const ssr = true;

interface Props {
    data: PageData;
}

let { data }: Props = $props();
</script>

<svelte:head
	><title>{data.post.fields.title}</title><meta
		name="description"
		content={data.post.fields.description}
	/>
</svelte:head>

<article>
	{@html data.content}
</article>
