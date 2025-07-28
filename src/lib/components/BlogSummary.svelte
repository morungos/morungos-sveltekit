<script lang="ts">
import type { CollectionItem } from '$lib/types'
let { post }: { post: CollectionItem } = $props();

const fm = post.frontmatter
</script>

<div class="post-preview">
{#if post.url}
<a href={post.url}><h3 class="post-title">{ fm.title }</h3></a>
{:else}
<h3 class="post-title">{ fm.title }</h3>
{/if}
<p class="post-subtitle">
    { fm.excerpt }
    {#if post.url}
    <i><a href={ post.url }>... Read more...</a></i>
    {/if}
</p>
<p class="post-meta">
    Posted 
    {#if fm.author}
    by { fm.author } 
    {/if}
    on July 06, 2025 
    ·
    {#if fm.words}
    {@const duration = Math.ceil(fm.words / 200)}
    { duration } minute{#if duration > 1}s{/if} read
    {/if}
</p>
</div>

<style>
.post-title {
    font-size: 24px;
    margin-top: 30px;
    margin-bottom: 10px;
}
.post-subtitle {
    font-size: 18px;
    font-weight: 300;
    margin: 0 0 10px;
}
.post-meta {
    font-size: 18px;
    font-style: italic;
    margin-top: 0;
    color: #868e96;
}
</style>