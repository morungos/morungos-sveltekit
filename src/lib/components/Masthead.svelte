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
let { title, background } = $props();
import { modules } from '$lib/collections/cards'

function getCard(background: string) {
    const card = modules[background ?? 'bg-about.jpg']
    if (! card) {
        throw new Error("Missing background: " + background)
    }
    return card
}
const card = $derived(getCard(background))
</script>

<header class="masthead-wrapper" id="menu">
    <enhanced:img src={ card } alt="An alt text" />
    <div class="overlay"></div>
    <div class="container masthead-body">
        <div class="pure-g">
            <div class="pure-u-1">
                <div class="masthead-heading">
                    <h1>{ title ?? "" }</h1>
                </div>
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

.masthead-heading {
    text-align: center;
    padding: 110px 0px 70px;
    position: relative;
    color: white;
}

.masthead-heading h1 {
    font-size: 48px;
    margin-top: 20px;
    min-height: 60px;
}
</style>
