<script lang="ts">
import '$lib/content-styles.css';
import type { PageData } from './$types.js';

import Showdown from 'showdown';

interface Props {
    data: PageData;
}

let { data }: Props = $props();

const converter = new Showdown.Converter();
const postContentHTML = converter.makeHtml(data.post.content);
</script>

<svelte:head
	><title>{data.post.fields.title}</title><meta
		name="description"
		content={data.post.fields.description}
	/>
</svelte:head>

<article>
	{@html postContentHTML}
</article>
