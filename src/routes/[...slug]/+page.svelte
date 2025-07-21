<script lang="ts">
import '$lib/content-styles.css';
import type { PageData } from './$types.js';

interface Props {
    data: PageData;
}

let { data }: Props = $props();
</script>

<svelte:head
	><title>{data.metadata.title}</title><meta
		name="description"
		content={data.metadata.description}
	/>
</svelte:head>

<article>
	<data.component></data.component>
</article>
