---
layout: post
title: 'Announcing @ScotsProverbBot: AI for Scots proverbs'
author: Stuart
background: '/img/posts/slidey0131.jpg'
summary: >-
  A new Twitter bot, to generate Scots proverbs.
excerpt: |-
  
image: '/img/posts/slidey0131.jpg'
image_description: "A lovely mountainous landscape in Scotland, crags in front, looking down to buildings on a lochside in the distance"
---

For quite some time, I've been fascinated by the language of inspirational quotes
and proverbs.  And so, on a recent trip visiting family, I stumbled on a copy of 
[Alexander Hislop's "The Proverbs Of Scotland"](https://www.gutenberg.org/ebooks/26150), 
a collection of about 4,000 dating from around 1862. 
Some of my favourites include:

> “It's a gude warld, but it's ill divided”

> “Ye shine like a white gir about a shairney cog” ("cog" is a metal-bound bucket for milking, "gir" is a metal hoop,
"shairn" is cowshit)

> “Corbies dinna pike out corbies' een”

> “I can dee fat I dow: the men in the Mearns can dee nae mair” (this last is pure "Doric", a distinctively Aberdeenshire variant of Scots)

Scots is a wonderful basis for this: it's close enough to English that many will get
the gist, but many of the words are different enough that unless you know them, 
they introduce a delightful ambiguity. Hislop's book an a great glossary, but there's
also an excellent [online Scots dictionary](https://dsl.ac.uk/) to explore, with many
pointers into Scots literature.

To hear a wonderful example of the Scots Language, [check out this podcast recording of 
Stevenson's "The Tale of Tod Lapraik"](https://podcasts.apple.com/gb/podcast/the-tale-of-tod-lapraik/id454320478?i=1000317014818), 
a semi-gothic tale set on the Bass Rock. Many of the proverbs resonate with this story, 
in particular, "wabsters" (weavers) were among the least-well-regarded members of 
citizenry. 

And yes, some of Hislop's examples demonstrate the very long tradition of outstanding
Scottish insults, [which continues to this day](https://www.buzzfeed.com/hilarywardle/custard-flavoured-jobby). In fact, 
I hope to add more modern Scots in, to maintain this tradition.

So I wanted to achieve a few things:

1. An artifact that celebrates the Scots language
2. Playfully exploring the 'sound' of a language and how it interacts with rhetoric
3. A demonstration of the [Slow AI](/2021/05/08/slow-ai/) approach
4. A small homage to my ancestral roots in Aberdeenshire

So, in this small project, I wanted to build a small Twitter bot using artificial intelligence, and specifically
a small language model, to generate made-up Scots proverbs while preserving as much as
possible of their language and rhetorical style, each with an accompanying image, and to 
tweet them every few hours. 

If you want to take a look, check out [@ScotsProverbBot](https://twitter.com/ScotsProverbBot) on Twitter,
although it's early days, and the collection will grow over time. It's currently set 
to tweet out a new proverb every eight hours, starting at noon Edinburgh time 
(obviouasly).

## Building a Twitter bot

An intriguing part was building the bot itself with a proper degree of legitimacy. 
Twitter have been pretty good at tightening the rules around writing bots, so I needed 
write a statement describing what I wanted to do, and why. 

Several times they connected back and asked more about what I intended to do with
the Twitter data. The answer is: nothing. As in all my past work, this is privacy
by design. The bot literally reads nothing! All it does is generate text and images,
and tweet them. 

This required ["Elevated"](https://developer.twitter.com/en/docs/twitter-api/getting-started/about-twitter-api) 
access, but once set up, it was all very straightforward. The actual coding wasn't
too bad, either: 99% of the work was authentication, which is not as well-described
as it might have been. It's very good at apps, less good for autonomous devices.

## The AI model

For the dataset, [even though Hislop's book is online](https://www.gutenberg.org/ebooks/26150), I went "old school" and
photographed and transcribed the pages. I made some punctuation changes, and removed the
annotations in English. I did remove a few proverbs, particularly for racism. What was acceptable in 1862
is not acceptable today, unsurprisingly.

The machine learning parts are built using [Pytorch](https://pytorch.org/), and, for now, a character-based 
recurrent network. Yes, there are better models out there, but I'm interested in how
well a small network, a couple of hundred thousand parameters, can capture the rhetoric
of the proverbs, as well as a decent Scots vocabulary. For now, this is good enough, 
especially that the data set is not too large. 

## Deployment

Personally, I am not a fan of Python. I will tolerate it, in Pytorch. However, I'd 
never ever want to use Python in production. As is my usual toolset, it's all done
in JavaScript. So, the deployment approach is this:

1. Train the model using [Pytorch](https://pytorch.org/)
2. Export the model to [ONNX](https://onnx.ai/)
3. Export the vocabulary and mappings to JSON
4. Use the [Node ONNX runtime](https://github.com/Microsoft/onnxruntime) to run the model, and the mappings to translate to characters
5. Use [node-canvas](https://github.com/Automattic/node-canvas) to compose the text with a random image and font

The Node ONNX runtime is actually a C library, so the performance is very decent, but
building it took a little work. In the end it was easier to flatten the Pi and reinstall
with a 64-bit OS than to attempt to build the ONNX runtime for the 32-bit system. Although
the pure JavaScript ONNX would also have been fine, just a little slower. It's still not
bad, it generates whole proverbs and accompanying rendered images at about 3 per second, and
since I'm aiming to tweet every eight hours or so, this is fine.

[**Note:** [there's also an excellent translator from ONNX to C](https://github.com/kraiskil/onnx2c), 
which generates straight C code with zero runtime dependencies. I've successfully used this to put this kind of language
model onto, for example, a Pico RP2040 microcontroller. Done naively it is relatively slow, 
due to emulation of floating point arithmetic, but it works fine. The model developed for
proverbs would fit fine in an RP2040 if we wanted to embed it in a physical artifact.]

## Images

From the start, I wanted each proverb to show in "inspirational quotes" style, with
a nicely formatted font and background image. So, as well as generating text, I needed
to render it to an image. 

Accessibility was very much in mind, so again, from the start, I needed to be able to
add the image metadata alternative text to the tweet itself.

I have a decent collection of fonts, but many were Postscript, so I had a happy hour
converting them all to OTF fonts, and then choosing a nice sample that fitted, more 
or less, the period and the style I was looking for. 

All the images were from my personal collection, and all are of various parts of 
Scotland. So there may be a few recognizable places and mountains. [Suilven](https://en.wikipedia.org/wiki/Suilven) is 
there, obviously. Final image rendering is done entirely with `node-canvas`.

## A few samples

Here are some examples, whether or not they make it into the final feed, who knows?
I will be applying some manual moderation, at least to start with -- not to select
the best, but to be sure we don't break any rules with anything too naughty.

!["He that leaves a wife wi' the bairns be wise what ye break a man"](/img/posts/22ead4c162e75575ccaed5c571cfac69b543d8da.jpeg){: .w-100 }

!["Ye're a pudding to his foot o' an ill fool"](/img/posts/36333ef1e102420d6cd5673b4f1247dca29e43ef.jpeg){: .w-100 }

!["He wha was better than my shoon than a cow o’ your meat"](/img/posts/5ada0cc1c48581a1192a74b83a261e0fa5d51b09.jpeg){: .w-100 }

## Future plans

Apple TV version anyone? 

Other than that, there's plenty of opportunity to improve the training data and the 
model considerably. I'd love to switch to transformers, but I'm using character level
models due to the relatively small amount of data, and character transformers aren't 
the very easiest.

It's also likely that I open up some variation in the designs and layouts
relatively soon.

## Follow the account

To keep track, [follow @ScotsProverbBot on Twitter](https://twitter.com/ScotsProverbBot).
And maybe me, too, [I'm @morungos on Twitter](https://twitter.com/morungos).

### Afterword

Thank you for reading. And I hope you enjoy it, and want to find out a little more 
about the Scots language.

_[If you choose to support me through @buymeacoffee, I'd be grateful, happy, and caffeinated.](https://www.buymeacoffee.com/morungos)_
