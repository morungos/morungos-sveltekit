<div class="navbar-wrapper" id="menu">
    <div class="container navbar-body">
        <div class="pure-g">
            <div class="pure-u-1 pure-u-md-1-2">
                <div class="pure-menu">
                    <a href="/" class="pure-menu-item pure-menu-link">Stuart Watt</a>
                    <button class="navbar-toggle" id="toggle" aria-label="Toggle menu">
                        <s class="bar"></s>
                        <s class="bar"></s>
                    </button>
                </div>
            </div>
            <div class="pure-u-1 pure-u-md-1-2">
                <div class="pure-menu pure-menu-horizontal navbar-menu-3 navbar-can-transform">
                    <ul class="pure-menu-list">
                        <li class="pure-menu-item"><a href="/" class="pure-menu-link">Home</a></li>
                        <li class="pure-menu-item"><a href="/about.html" class="pure-menu-link">About</a></li>
                        <li class="pure-menu-item"><a href="/contact.html" class="pure-menu-link">Contact</a></li>
                        <!-- 
                        <li class="pure-menu-item"><a href="/posts.html" class="pure-menu-link">Posts</a></li>
                        <li class="pure-menu-item"><a href="/gallery.html" class="pure-menu-link">Gallery</a></li>
                        -->
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.navbar-wrapper {
    position: fixed;
    z-index: 1;
    width: 100%;
    top: 0;
    margin-bottom: 1em;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
    -webkit-transition: height 0.5s;
    -moz-transition: height 0.5s;
    -ms-transition: height 0.5s;
    transition: height 0.5s;
}

.navbar-body .pure-g {
    margin-left: -15px;
    margin-right: -15px;
}

.navbar-body .pure-menu-item {
    padding-left: 15px;
    padding-right: 15px;
}

.navbar-wrapper.open {
    height: 14em;
}

.navbar-menu-3 {
    text-align: right;
}

.navbar-toggle {
    width: 34px;
    height: 34px;
    position: absolute;
    top: 0;
    right: 0;
    display: none;
}

.navbar-toggle .bar {
    background-color: #777;
    display: block;
    width: 20px;
    height: 2px;
    border-radius: 100px;
    position: absolute;
    top: 18px;
    right: 7px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    transition: all 0.5s;
}

.navbar-toggle .bar:first-child {
    -webkit-transform: translateY(-6px);
    -moz-transform: translateY(-6px);
    -ms-transform: translateY(-6px);
    transform: translateY(-6px);
}

.navbar-toggle.x .bar {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

.navbar-toggle.x .bar:first-child {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
}
</style>