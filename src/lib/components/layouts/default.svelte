<script lang="ts">
let { children } = $props();
export const prerender = true;
</script>

{@render children()}
