<script lang="ts">
let date = new Date();
</script>

<footer>
  <div class="container">
    <hr>
    <div class="footer-container">
    <ul class="footer-list">
        <li class="footer-list-item">
        <a href="mailto:morungos@gmail.com" aria-label="Send an email">
        <span class="icon icon-email"></span>
        </a>
        </li>
        <li class="footer-list-item">
        <a rel="me" href="https://bsky.app/profile/morungos.bsky.app" aria-label="Bluesky: @morungos.bsky.app">
            <span class="icon icon-bluesky"></span>
        </a>
        </li>
        <li class="footer-list-item">
        <a href="https://www.linkedin.com/in/morungos" aria-label="LinkedIn: morungos">
        <span class="icon icon-linkedin"></span>
        </a>
        </li>
        <li class="footer-list-item">
        <a href="https://github.com/morungos" aria-label="Github profile">
            <span class="icon icon-github"></span>
        </a>
        </li>
    </ul>
    <p class="copyright">Copyright &copy; Stuart Watt { date.getFullYear() }</p>
  </div>
  </div>
</footer>

<style>
.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #944444;
    border-radius: 100%;
    background-repeat: no-repeat;
    background-position: center;
}

.icon-github {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6c0-0.4,0-0.9,0.2-1.3 C7.2,6.1,7.4,6,7.5,6c0,0,0.1,0,0.1,0C8.1,6.1,9.1,6.4,10,7.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3c0.9-0.9,2-1.2,2.5-1.3 c0,0,0.1,0,0.1,0c0.2,0,0.3,0.1,0.4,0.3C17,6.7,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4 c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3C22,6.1,16.9,1.4,10.9,2.1z'%3E%3C/path%3E%3C/svg%3E")
}
.icon-linkedin {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M7.738,17L7.738,17 c-0.697,0-1.262-0.565-1.262-1.262v-4.477C6.477,10.565,7.042,10,7.738,10h0C8.435,10,9,10.565,9,11.262v4.477 C9,16.435,8.435,17,7.738,17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2 S8.551,8.717,7.694,8.717z M16.779,17L16.779,17c-0.674,0-1.221-0.547-1.221-1.221v-2.605c0-1.058-0.651-1.174-0.895-1.174 s-1.058,0.035-1.058,1.174v2.605c0,0.674-0.547,1.221-1.221,1.221h-0.081c-0.674,0-1.221-0.547-1.221-1.221v-4.517 c0-0.697,0.565-1.262,1.262-1.262h0c0.697,0,1.262,0.565,1.262,1.262c0,0,0.282-1.262,2.198-1.262C17.023,10,18,10.977,18,13.174 v2.605C18,16.453,17.453,17,16.779,17z'%3E%3C/path%3E%3C/svg%3E")
}
.icon-bluesky {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M18.231,3.618c-2.312,1.736-4.785,5.107-5.948,7.244c-0.123,0.226-0.444,0.226-0.567,0 c-1.163-2.137-3.636-5.508-5.948-7.244C3.949,2.252,1,1.195,1,4.559c0,0.672,0.385,5.643,0.611,6.451 c0.606,2.169,2.454,3.089,4.437,3.195c0.19,0.01,0.222,0.261,0.043,0.324c-2.988,1.048-3.518,3.196-1.424,5.344 c3.826,3.894,5.814,0.647,6.733-1.514c0.224-0.525,0.977-0.525,1.2,0c0.92,2.161,2.907,5.408,6.733,1.514 c2.093-2.148,1.564-4.296-1.424-5.344c-0.179-0.063-0.146-0.313,0.043-0.324c1.983-0.106,3.83-1.026,4.437-3.195 C22.615,10.203,23,5.231,23,4.559C23,1.195,20.051,2.252,18.231,3.618z'%3E%3C/path%3E%3C/svg%3E");
}
.icon-email {
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='white' d='M19 14.5v-9c0-.83-.67-1.5-1.5-1.5H3.49c-.83 0-1.5.67-1.5 1.5v9c0 .83.67 1.5 1.5 1.5H17.5c.83 0 1.5-.67 1.5-1.5zm-1.31-9.11c.33.33.15.67-.03.84L13.6 9.95l3.9 4.06c.12.14.2.36.06.51-.13.16-.43.15-.56.05l-4.37-3.73-2.14 1.95-2.13-1.95-4.37 3.73c-.13.1-.43.11-.56-.05-.14-.15-.06-.37.06-.51l3.9-4.06-4.06-3.72c-.18-.17-.36-.51-.03-.84s.67-.17.95.07l6.24 5.04 6.25-5.04c.28-.24.62-.4.95-.07z'/%3E%3C/svg%3E");
}

.footer-list {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100%;
}
.footer-list-item {
    margin: 0.5em;
}

.copyright {
    text-align: center;
    font-size: 80%;
    color: #444;
    margin-top: 0.5em;
}
</style>