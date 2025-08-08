<script lang="ts">
import type { PageData } from './$types.js';

interface Props {
    data: PageData;
}

let { data }: Props = $props();
</script>

<svelte:head>
	<title>{ data.frontmatter.title }</title>
	<meta property="og:type" content="article" />
	<meta property="og:locale" content="en_CA" />
	<meta property="og:image" content={ data.frontmatter.card } />
	{#if data.component.head}
	{@html data.component.head}
	{/if}
</svelte:head>

<article>
	{@html data.component.body}
</article>
