<script lang="ts">
import type { CollectionItem } from "$lib/types";
let { post }: { post: CollectionItem } = $props();

const fm = post.frontmatter

const formatter = new Intl.DateTimeFormat("en-CA", {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

function getPostDate(post: CollectionItem) {
    const year = post.params['year']
    const month = post.params['month']
    const day = post.params['day']
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

let postDate = $derived(getPostDate(post));
</script>

<div class="post-preview">
{#if post.url}
<a href={post.url}><h3 class="post-title">{ fm.title }</h3></a>
{:else}
<h3 class="post-title">{ fm.title }</h3>
{/if}
<p>
    { fm.excerpt }
    {#if post.url}
    <i><a href={ post.url }>... Read more...</a></i>
    {/if}
</p>
<p class="post-meta">
    {#if fm.author}
    by { fm.author } on
    {/if}
    {#if postDate}
    { postDate } 
    {/if}
    {#if fm.words}
    {@const duration = Math.ceil(fm.words / 200)}
    · { duration } minute{#if duration > 1}s{/if} read
    {/if}
</p>
</div>

<style>
.post-title {
    font-size: 24px;
    margin-top: 30px;
    margin-bottom: 10px;
}
.post-meta {
    font-size: 18px;
    font-style: italic;
    margin-top: 0;
    color: #868e96;
}
</style>