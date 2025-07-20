<script lang="ts">
let { title }: { title: string } = $props();

const imageModules = import.meta.glob(
    '$lib/../backgrounds/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
    {
        eager: true,
        as: 'url',
    }
)

</script>

<div class="masthead-wrapper" id="menu" style={ "background-image: url(" + imageModules['/src/backgrounds/bg-about.jpg'] + ")" }>
    <div class="container masthead-body">
        <div class="pure-g">
            <div class="pure-u-1">
                <div class="masthead-heading">
                    <h1>{ title }</h1>
                </div>
            </div>
        </div>
    </div>
</div>


<style>
.masthead-wrapper {
    margin-bottom: 1em;
    min-height: 8em;
    background: no-repeat center center;
    background-color: #868e96;
    background-attachment: scroll;
    position: relative;
    background-size: cover;
}

.masthead-wrapper h1 {
    color: white;
}

.masthead-heading {
    text-align: center;
    padding: 110px 0px 70px;
}
</style>
