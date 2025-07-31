<script lang="ts">
let open = $state(false);
</script>

<div class="navbar-wrapper" class:open={ open }>
    <div class="container navbar-body">
        <div class="navbar-flex">
            <div class="pure-menu">
                <a href="/" class="pure-menu-item pure-menu-link navbar-brand">Stuart Watt</a>
                <button class="navbar-toggle" aria-label="Toggle menu"
                        onclick={() => open = !open}>
                    <s class="navbar-toggle-icon"></s>
                </button>
            </div>
            <div class="pure-menu pure-menu-horizontal navbar-menu-items navbar-can-transform">
                <ul class="pure-menu-list">
                    <li class="pure-menu-item navbar-item"><a href="/" class="pure-menu-link">Home</a></li>
                    <li class="pure-menu-item navbar-item"><a href="/about/" class="pure-menu-link">About</a></li>
                    <li class="pure-menu-item navbar-item"><a href="/posts/" class="pure-menu-link">Posts</a></li>
                    <li class="pure-menu-item navbar-item"><a href="/contact/" class="pure-menu-link">Contact</a></li>
                    <!-- 
                    <li class="pure-menu-item"><a href="/gallery.html" class="pure-menu-link">Gallery</a></li>
                    -->
                </ul>
            </div>
        </div>
    </div>
</div>

<style>
.navbar-wrapper {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    position: absolute;
    z-index: 1030;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    -webkit-font-smoothing: antialiased;
    -webkit-transition: height 0.5s;
    -moz-transition: height 0.5s;
    -ms-transition: height 0.5s;
    transition: height 0.5s;
    background-color: white;
}

.navbar-wrapper .pure-menu-item {
    height: inherit;
}

.navbar-brand:focus, .navbar-brand:hover {
    color: #0085A1;
}
.navbar-brand {
    font-weight: 800;
    color: #212529;
}

.navbar-flex {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: -15px;
    margin-right: -15px;
}

.navbar-wrapper.open {
    height: 14em;
}

.navbar-menu-items {
    display: flex;
    flex-direction: row;
    justify-content: end;
}

.navbar-toggle {
    width: 34px;
    height: 34px;
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    margin: .5em;
    background-color: white;
    border: 1px solid #777;
    border-radius: 4px;
    padding: 4px;
}

.navbar-toggle:hover,.navbar-toggle:active {
    background-color: #eee;
}

.navbar-toggle-icon {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background: url("data:image/svg+xml,%3Csvg viewBox='-0.5 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 12.32H22' stroke='%23000000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M2 18.32H22' stroke='%23000000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M2 6.32001H22' stroke='%23000000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E")
}

.navbar-item {
    font-size: 16px;
    line-height: 2.4;
}

@media (max-width: 47.999em) {
    .navbar-menu-items {
        display: none;
    }

    .navbar-toggle {
        display: block;
    }
}
</style>