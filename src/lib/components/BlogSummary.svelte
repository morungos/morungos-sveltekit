<script lang="ts">
import type { CollectionSummaryItem } from "$lib/types";
let { item }: { item: CollectionSummaryItem } = $props();

const fm = item.frontmatter

const formatter = new Intl.DateTimeFormat("en-CA", {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

function getItemDate(item: CollectionSummaryItem) {
    const year = item.params['year']
    const month = item.params['month']
    const day = item.params['day']
    if (! year || ! month || ! day) {
        return null;
    }

    try {
        const parsedYear = parseInt(year)
        const parsedMonth = parseInt(month)
        const parsedDay = parseInt(day)

        const date = new Date(parsedYear, parsedMonth, parsedDay)
        return formatter.format(date);
    } catch (e) {
        return null;
    }
}

let itemDate = $derived(getItemDate(item));
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
    {#if itemDate}
    { itemDate } 
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