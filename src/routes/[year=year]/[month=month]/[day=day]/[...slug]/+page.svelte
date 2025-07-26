<script lang="ts">
import '$lib/content-styles.css';
import type { PageData } from './$types.js';

interface Props {
    data: PageData;
}

let { data }: Props = $props();
</script>

<svelte:head
	><title>{data.frontmatter.title}</title><meta
		name="description"
		content={data.frontmatter.description}
	/>
</svelte:head>

<article>
	<data.component></data.component>
</article>
