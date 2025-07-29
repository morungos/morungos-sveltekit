<script lang="ts">
import BlogSummary from "$lib/components/BlogSummary.svelte";
import type { PageData } from "./$types";

interface Props {
    data: PageData;
}

let { data }: Props = $props();
</script>

<p>
Hi, <a href="/about/">I'm Stuart</a>, and welcome. I'm a developer with an extra: a background
in the cognitive and social sciences. I love to create products and solutions that 
make people's everyday lives better. But more than that, I treat every
application I create as a performance, a demonstration of skill and craft. So 
please feel free to read on, browse, or <a href="/contact/">contact me to find out more</a>.
</p>

<hr class="separator">

<h2>Selected development stories</h2>

<ul>
<li><a href="2024/08/14/cheap-infrastructure/">Stuart’s guide to high-availability services on a budget</a></li>
<li><a href="/stories/chat/">Live chat component -- Svelte, Vite, and TypeScript for the win</a></li>
<li><a href="/stories/syllabus/">Syllabus -- constraint satisfaction for timetabling</a></li>
<li><a href="stories/translational/">Heliotrope and cBioPortal -- translational genomics in the clinic</a></li>
<li><a href="/stories/embedded/">Tiny embedded language models</a></li>
<li><a href="/stories/hank/">Hank: a novel visual modelling language</a></li>
</ul>

<hr class="separator">

<h2>Latest posts</h2>

{#each data.posts as post}
<BlogSummary post={ post } />
{/each}

<div class="button-container">
    <div class="buttons">
        <a class="pure-button pure-button-primary" href="/posts">View All Posts →</a>
    </div>
</div>

<style>
.button-container {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
}
</style>