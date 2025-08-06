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
<BlogSummary item={ post } />
{/each}

<div class="button-container" class:buttons-right={ ! data.page.hasPrevious }>
    {#if data.page.hasPrevious}
    <a 
        class="pure-button pure-button-primary morungos-button" 
        href="/posts/page{ data.page.previousPage + 1 }">← Newer<span class="conditional">&nbsp;posts</span></a>
    {/if}
    {#if data.page.hasNext}
    <a 
        class="pure-button pure-button-primary morungos-button" 
        href="/posts/page{ data.page.nextPage + 1 }">Older<span class="conditional">&nbsp;posts</span> →</a>
    {/if}
</div>

<style>
.button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.button-container.buttons-right {
    flex-direction: row-reverse;
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