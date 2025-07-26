---
title: 'Live chat components: Svelte, Vite, and TypeScript for the win'
description: template-sveltekit-md-docs provides an example of how markdown docs can be rendered by SvelteKit. Markdown content is supported as natively as possible, this allows compatibility with other markdown editors/renders (ex. github, obsidian).
---

One of my more recent projects was a complete rebuild of a legacy live chat
component, designed to be compatible with [LiveChat's](https://www.livechat.com)
service, but which added a few features missing from LiveChat. The key
requirements were more or less as follows:

* A standalone and responsive web component, which could be linked and used by
  third party clients, on both desktop and mobile e-commerce sites
* Completely theme-able, allowing positioning, colours, fonts, labels, language
  translations, all to be customized for each client
* Full support for structured pre-chat surveys, allowing client-specific and
  task-specific data to be collected to help give human assistants context
* Integration with product lists and shopping carts, so human assistants could 
  actively assist customers
* Safe handling for out-of-hours usage, allowing sets of frequently asked
  questions and other content to be used when no live assistants were available
  and on line
* Full WCAG compliance, with both speech readers and keyboard navigation

By and large, the new component had to follow the flow and pattern of the
previous implementation, which had been in [Vue 2](https://v2.vuejs.org), then at end of life.
And this is what it looked like, on one of our test pages.

<figure class="figure w-75">
  <enhanced:img 
    class="img-fluid border" src="/src/images/pages/flow-regular-5.png" 
    alt="Screenshot of chat component in use"></enhanced:img>

  <figcaption class="figure-caption">Screenshot of chat component in use</figcaption>
</figure>

### Technologies used

* Main code: [Svelte](https://svelte.dev), with
  [TypeScript](https://www.typescriptlang.org) as the primary implementation
  language
* [Vite](https://vitejs.dev) and [Rollup](https://rollupjs.org) for build and packaging,
  [Vitest](https://vitest.dev) for unit tests, and with an additional set of
  [Puppeteer](https://pptr.dev) scripts to allow side-by-side consistency checks
* [SystemJS](https://github.com/systemjs/systemjs) packages for deployment, to support
  browsers that didn't yet handle JavaScript ESM
* Styling: Extensive use of CSS3 custom properties, but with some additional per-client
  CSS
* Packaging: A custom build process based on [Rollup](https://rollupjs.org), which integrated per-client
  localization into a separately loadable per-client layer, loaded using our customized
  [SystemJS](https://github.com/systemjs/systemjs).

So, how did it all work out?

First, *Svelte is amazing. I cannot recommend it highly enough.* It's similar
enough to React to be an easy transition, without the tendency to use hooks
everywhere for everything. And it's cleaner and more consistent than traditional
old-school React components. Also, because it's essentially *compiled* (Svelte
is more a compiler than a library) the resulting code base is very compact, and
easy to treeshake down using Rollup. The final bundles were about 1/3 the size
of the Vue 2 build, and could be loaded asynchronously, so the time to first
render was correspondingly much faster. 

The one aspect that was a little more complex to build was state management, but
that was because the Vue 2 version was an arcane mess, and there were all sorts
of strange inter-component dependencies that really did not manifest until a new
framework was in place. However, that too was good in the end, because most of
these inter-component dependencies were able to cause very strange end user
behaviours, so it was all a nest of vipers until we had a proper state system in
place. This actually meant leaning more on LiveChat, which had a way to store
key state information in its session data, meaning it worked properly across
multiple tabs, which had always been a problem before. It also meant that we had
full privacy compliance, as all customer state information was stored
consistently in one place, where it was needed.

Next, using Vite and Rollup made our per-client customization much simpler. We
could package each client into their own module, rather than creating a new
build for each client. This allowed us to put *much* more effort into validating
per-client builds, which were one of the more common risks with Vue 2 and its
use of Webpack. It was just a little too easy to leave a label untranslated,
because there was really no way to validate a client's customization setup.
Rollup made it much simpler to write our own plugins for validation and
packaging, with a much simpler interface.

Svelte's support for accessibility was really pretty good from the start. As a
compiler, it would give warnings for missing accessibility attributes. That
meant we could focus on the hard part, which was making the UX right for users
with visual or motor impairments.

I loved working on this project! If you need anything like this, [hit me up](/contact). 