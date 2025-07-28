<script lang="ts">
import type { CollectionItem } from '$lib/types'
let { post }: { post: CollectionItem } = $props();

const fm = post.frontmatter
</script>

{#if post.url}
<a href={post.url}><h3>{ fm.title }</h3></a>
{:else}
<h3>{ fm.title }</h3>
{/if}
<p>
    { fm.excerpt }
</p>
<p>
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
