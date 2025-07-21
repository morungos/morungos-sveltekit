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
import Masthead from '$lib/components/Masthead.svelte';

import { page } from '$app/state';
import '../app.css';
	
let { children, data } = $props();
</script>

<Navigation />

<Masthead title={ page.data?.metadata?.title } />

<div class="container">
	<div class="flex flex-col md:flex-row">
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
