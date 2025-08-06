<!--
A significant challenge here is that we need to dynamically choose an image and
yet allow them to be preprocessed. We could, in theory, just reprpocess a whole
bunch of them. But, Vite silently changes our query from '$lib/.' to '/src/lib'
or whatever, making Markdown needing to be aware of header image file locations.
Which is less than ideal. We solve this in a less than elegant matter by forcing
a new cards directory to be flat an both cards and backgrounds are required to
accept them.
-->

<script lang="ts">
import { modules } from '$lib/collections/cards'
import { page } from '$app/state';

let { 
    title,
    card,
    cardAlt,
    subheading,
}: {
    title: string, 
    card: string, 
    cardAlt: string,
    subheading: string,
} = $props();

function getCard(card: string) {
    const cardData = modules[card ?? 'bg-about.jpg']
    if (! cardData) {
        throw new Error("Missing card: " + card)
    }
    return cardData
}

function getCardImageURL(card: any): string {
    const src: string = card.img?.src;
    const sources: { [k: string]: string } = card?.sources;
    if (! src || ! sources) {
        throw new Error("Can't find card");
    } 

    // Find the type, we might not have an extension here thanks to imagetools
    const native = Object.keys(sources).find((k: string) => sources[k].includes(src))
    if (! native) return src;
    const images = sources[native].split(/\s*,\s*/)

    // Look for a 1200w URL of that type, or just return the src
    for(const image of images) {
        if (image.endsWith(" 1200w")) {
            return image.slice(0, -6)
        }
    }
    return src
}

const cardData = $derived(getCard(card))
</script>

<svelte:head>
    <meta property="og:image" content={ getCardImageURL(cardData) } />
    <meta property="og:image:alt" content={ cardAlt } />
    <meta property="og:url" content={ page.url.toString() } />
</svelte:head>

<header class="masthead-wrapper" id="menu">
    <enhanced:img src={ cardData } alt={ cardAlt } />
    <div class="overlay"></div>
    <div class="container masthead-body">
        <div class="pure-g">
            <div class="pure-u-1 masthead-heading-body">
                <h1 class="masthead-heading">{ title ?? "" }</h1>
                {#if subheading}
                <h2 class="masthead-subheading">{ subheading }</h2>
                {/if}
            </div>
        </div>
    </div>
</header>

<style>
.masthead-wrapper {
    margin-bottom: 50px;
    background: no-repeat center center;
    background-color: #868e96;
    background-attachment: scroll;
    position: relative;
    background-size: cover;
    min-height: 18rem;
}

.masthead-wrapper :global(picture) :global(img) {
    position: absolute;
    top : 0;
    right : 0;
    bottom: 0;
    left: 0;
    width : 100%;
    height : 100%;
    object-fit: cover;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #212529;
    opacity: 0.5;
}

.masthead-heading-body {
    position: relative;
    text-align: center;
    padding: 70px 0 0 0;
}

.masthead-heading {
    color: white;
    font-size: 40px;
    min-height: 60px;
    margin-bottom: 1em;
}

.masthead-subheading {
    color: #ddd;
    font-family: var(--body-font-family);
    font-size: 20px;
    font-weight: 500;
    font-style: italic;
    margin-bottom: 1em;
}
</style>
