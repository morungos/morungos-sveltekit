<script lang="ts">
let { title }: { title: string } = $props();

const imageModules = import.meta.glob(
    '$lib/../backgrounds/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
    {
        eager: true,
        query: '?enhanced',
        import: 'default'
    }
) as Record<string, any>
</script>

<header class="masthead-wrapper" id="menu">
    <enhanced:img src={ imageModules['/src/backgrounds/bg-about.jpg'] } alt="An alt text" />
    <div class="overlay"></div>
    <div class="container masthead-body">
        <div class="pure-g">
            <div class="pure-u-1">
                <div class="masthead-heading">
                    <h1>{ title }</h1>
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
}
</style>
