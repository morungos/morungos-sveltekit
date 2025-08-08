<script lang="ts">
import type { PageData } from './$types.js';

interface Props {
    data: PageData;
}

const { data }: Props = $props();
</script>

<svelte:head>
	<title>{data.frontmatter.title}</title>
	<meta
		name="description"
		content={data.frontmatter.description}
	/>
	{#if data.component.head}
	{@html data.component.head}
	{/if}
</svelte:head>

<article>
	{@html data.component.body}
</article>
