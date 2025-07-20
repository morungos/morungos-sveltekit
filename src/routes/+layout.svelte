<!-- 
Our pages contain four sections:

- A brand and navigation bar
- A masthead
- Page content
- A footer

Most of these will be page-specific to some extent, so we should allow them 
all to be if needed. As with the rest of everything, it's all server-side 
rendered.

Main navigation bar shoukd likely have responsive dropdowns; see:
https://pure-css.github.io/layouts/tucked-menu-vertical/
-->

<script lang="ts">
import Navigation from '$lib/components/Navigation.svelte';
import { page } from '$app/state';
import '../app.css';
	
let { children, data } = $props();
</script>

<Navigation />

<div class="container mx-auto max-w-5xl">
	<div class="flex flex-col md:flex-row">
		<div>
			<h3>Pages</h3>
			<ul>
				<li>
					<a
						href="/"
						class="capitalize hover:text-orange-700 hover:underline"
						class:text-orange-600={page.url.pathname === `/`}
						class:underline={page.url.pathname === `/`}>Home</a
					>
				</li>
				{#each data.slugList as slugItem}
					<li>
						<a
							href="/{slugItem.slug}"
							class="capitalize hover:text-orange-700 hover:underline"
							class:text-orange-600={page.url.pathname === `/${slugItem.slug}`}
							class:underline={page.url.pathname === `/${slugItem.slug}`}
							>{slugItem.slug.replace('-', ' ')}</a
						>
					</li>
				{/each}
			</ul>
		</div>
		<div class="overflow-y-scroll w-full md:h-screen scrollbar-transparent">
			<div class="my-4 mx-4">
				{@render children()}
			</div>
		</div>
	</div>
</div>

<style>
	.scrollbar-transparent {
		scrollbar-width: thin;
		scrollbar-color: #0000004d transparent;
	}
</style>
