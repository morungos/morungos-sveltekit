<script lang="ts">
	import BlogSummary from "$lib/components/BlogSummary.svelte";
import type { PageData } from "./$types";

interface Props {
    data: PageData;
}

let { data }: Props = $props();
let items = $derived(data.page.items)
</script>

{#each items as post (post.id)}
<BlogSummary post={ post } />
{/each}

<div class="button-container">
    <a 
        class="pure-button pure-button-primary" 
        class:button-hidden={! data.page.hasPrevious}
        href="/posts/page{ data.page.previousPage + 1 }">← Newer<span class="conditional">&nbsp;posts</span></a>
    <a 
        class="pure-button pure-button-primary" 
        class:button-hidden={! data.page.hasNext}
        href="/posts/page{ data.page.nextPage + 1 }">Older<span class="conditional">&nbsp;posts</span> →</a>
</div>

<style>
.button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.button-hidden {
    visibility: hidden;
}
.conditional { 
    display: inline;
}

@media (max-width: 47.999em) {
    .conditional {
        display: none;
    }
    .button-container {
        font-size: 85%;
    }
}
</style>