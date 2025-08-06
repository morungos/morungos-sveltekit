<script lang="ts">
import type { CollectionSummaryItem } from "$lib/types";
let { item }: { item: CollectionSummaryItem } = $props();

const fm = item.frontmatter
</script>

<div class="item-preview">
{#if item.url}
<a href={item.url}><h3 class="item-title">{ fm.title }</h3></a>
{:else}
<h3 class="item-title">{ fm.title }</h3>
{/if}
<p>
    { fm.excerpt }
    {#if item.url}
    <i><a href={ item.url }>... Read more...</a></i>
    {/if}
</p>
<p class="item-meta">
    {#if fm.author}
    by { fm.author } on
    {/if}
    {#if item.date}
    { item.date } 
    {/if}
    {#if fm.words}
    {@const duration = Math.ceil(fm.words / 200)}
    · { duration } minute{#if duration > 1}s{/if} read
    {/if}
</p>
</div>

<style>
.item-title {
    font-size: 24px;
    margin-top: 30px;
    margin-bottom: 10px;
}
.item-meta {
    font-size: 18px;
    font-style: italic;
    margin-top: 0;
    color: #868e96;
}
</style>