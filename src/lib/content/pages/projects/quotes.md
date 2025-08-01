---
layout: page
title: The "Cite-a-tron"
draft: true
author: Stuart
summary: >-
  An exploration of tiny embedded language models, and how we can use them
  to build objects in the manner of Slow AI, that help reflect on our use of
  language.
background: '/img/pages/IMG_1141.jpeg'
image: '/img/pages/IMG_1141.jpeg'
image_description: 'A small assembly of wires an an e-ink display showing an imaginary quotation'
---
<script>
import video from '$lib/assets/video/quotes.mp4';
import videoCaptions from '$lib/assets/video/quotes.captions.vtt';
</script>

The "cite-a-tron" (I need a better name, but "quotes device" is even worse and 
that's what I've been using so far) is a small standalone artifact in a wooden case that uses AI
to generate a random inspirational quote -- or, rather, to generate language that
echoes an inspirational quote, about once a day. 

It's in the spirit of 
["Slow AI"](https://morungos.com/2021/05/08/slow-ai/), and is very much intended 
to get people thinking about rhetoric and language, and on what we
expect from quotes by famous people, and how much of ourselves is involved
in the way we interpret language. The core of it is a simple but entirely
embedded AI model to generate natural language within the device itself. There
are no networking functions of any kind.

There is also an allusion to "Love Letters", a resurrection of an early Manchester
text generator from the 1950s, built originally by Chris Strachey. That was more or
less the first artificial intelligence natural language generation application.

A few samples, for demonstration:



### How it works

The device (today) consists of a Raspberry Pi Pico controlling a small, 4.2 inch, e-Paper
display, with a piezo buzzer for sound effects, and possibly an LED for status display. The
Pico was chosen primarily because it has a big enough memory space and enough
processing oomph to run an interesting model without requiring too much power. 
I also consciously wanted the device to not be networkable, for safety reasons, 
and as a reaction against the large language models with expensive cloud costs. 
The Pico has proven a good fit, and is cheap enough to make the full setup very
cost effective. The actual costs of building the AI model and the device itself are
pennies -- apart from the human time in curating and building. The processes of hand curation, as 
well as hand construction, are important parts of the work.

Here's the basic Pico generating a quote and updating the display.

<figure>
  <video controls="controls">
    <source src={ video }>
    <track
      default
      kind="captions"
      srclang="en"
      src={ videoCaptions } />
  </video>
</figure>

The AI part of the technology works as follows.

There are two separate language models, one for names, and one for inspirational
quotes. I curated the two separately, then shuffled them into two text files, 
with newline characters between items, and then used them to train two separate
CharRNN language models, implemented in [Pytorch](https://pytorch.org/) and running 
on an [NVIDIA Jetson Nano](https://developer.nvidia.com/embedded/jetson-nano-developer-kit).
Both took some tuning to get acceptable values. 

The architectures of both networks are more or less the same: an embedding layer, 
a set of recurrent layers, and an output layer. For names, two recurrent layers
was sufficient; for the quotes, three works better. And for names, the sequence
length was short (20 characters), where for quotes it worked better much longer,
reflecting the long-range dependencies in the quote text.

I chose inspirational quotes because they have a very specific rhetorical style. 
They tend to use repetition (e.g., The most effective way to do it, is to do it"), 
and contrasts (e.g., "Falsehood is easy, truth so difficult"), especially between
positives and negatives, as well as an assortment of common patterns like the
rule of three (e.g., "Do what you can. Want what you have. Be who you are"). What
I am trying to do here is explore the extent to which the style can be abstracted
from the substance -- and to look at the style more or less in isolation. It is not
completely successful, but for my purposes, for now, it's good enough. And the
same hardware has a little capacity yet, especially if I can quantize the models,
to improve and still nicely fit inside the Pico.

I have also mixed multiple sources, including very specific quotes on coding. For
now, I've removed these, for several reasons: they're not completely of a piece
with inspirational quotes, and curation is hard. They're longer, and a non-negligible
proportion are misogynistic and problematic in other ways. While they often did 
generate intriguing combinations, for now, I've simply dropped them out of the
collection. However, the principle of mixing languages and sources proved 
intriguing, and i will come back to it.

Anyway, having build two trained models, and chosen reasonably good checkpoints,
I exported them as ONNX files, which make them easier to run on different platforms.

I finally used [`onnx2c`](https://github.com/kraiskil/onnx2c) to translate them 
into pure C code, which compiles in as
part of the Pico build process. Admittedly, the models use *a lot* of floating
point calculations which the Pico emulates, and it's relatively slow, generating
1-2 character per second. 

There are other options for ONNX. For demo and test purposes, I've used a JavaScript
engine for the same models, so in theory it can also be embedded in browsers. In fact,
the original idea was a Twitter bot, with a little more work on generating appropriate
images. I may come back to that, but the physicality felt like a better direction for now

The original plan was to use model quantization, to turn the floating point numbers into
integers, which are smaller, and would be very much faster on a Pico. But when I 
saw the live generation, I liked the rhythm of 1-2 characters per second, so I 
decided to keep it as is for now. This also inspired the use of a piezo component
to 'click' per character, echoing a teletype.

So the main controller, when it starts, generates a quote using the first model, 
and a name using the second. If they're too long, we simply generate another. I then
use simple line breaks and format them for use on an e-Paper display, and when the
layout is complete, generate a refresh for the display. e-Paper being e-Paper, we
can then shut down all the power and sleep tight, until next time, with the 
display remaining.

The software isn't yet done for the piezo, but I'll be doing a small click more or
less for each character, when it's actually generating, sort of echoing an old
fashioned teletype sound. That may change to a better PWM later, but the wiring won't
need to change for that. To avoid it being too annoying, there'll be a jumper to 
turn off the sound. That's very nearly as much configuration as I hope to allow.

For testing, I'm generating quotes every few minutes, but in the spirit of "Slow AI",
it'll maybe be 6-8 hours in the long run. 

Seeing that this is a Pico, which will simply be powered by battery, and has no
network access whatsoever, configuration will be limited to a small set of 
jumpers. Probably as follows.

 - J1 -- enables mock-typing clicks (remove to silence)
 - J2 -- selects between daily or every 6-8 hours between quotes
 - J3/J4 -- not used

### The enclosure

The initial version will be a small wooden frame, around 9 inches by 7 inches, 
and around 1.5 inches in depth, with 
the e-Paper in the middle. The electronics will be hand-soldered and wired on a 
prototyping board, and visible at the back. The e-Paper will plug into a connector
on the board, so it's easy to remove. 

However, I will have to hand chisel some of the frame, since I don't have a
routing tool. My hope is to get a couple of these built, send them to people
I trust to live with for a few months for feedback, and in the meantime, work
on ways to make nicer boxes that are more based on local and sustainable 
materials. I especially want to keep the *natural* aspect. If I could 
make "woodland steampunk" into an aesthetic, that's where I'd be heading.
Rustic, but AI. 

I'm planning to power it directly off three AA batteries, at least at first. 
My calculations suggest this might last a few months, because the Pico isn't very
very low power in sleep. A second iteration may add a real time clock to reduce
power usage during sleep. 

I'm also looking into:

 - A more "steampunk" presentation, likely including even mock valves, which
   illuminate when the network is running. A tiny glowing filament would be 
   perfect, but I need to find a way to do that, and I haven't yet done so.
 - A "paper tape" version, which would dispense with a screen and emit a printed
   quote every day or so. Thermal printers would be simple for this, but I don't
   especially like the disposability of the paper. So this remains an open idea.


### Remaining challenges

These are character-level models, so they can and do literally create new words. 
This means that I have to complete a filter of sorts, to stop it re-generating
words that will not be acceptable. For example, the language models can and do generate
names like "Andrew Fucker" that riff off words that aren't in the training data. 
At the moment, fortunately, that is fairly rare. For now, it's only me that
sees these, but I won't be gifting any until I can be sure that the texts are going
to be safe -- and more importantly, not derogatory, even by accident. 

There are gender issues too, with the names. On the plus side, the network has a 
delightful ability to create mixed names like "Jennifer John Ferriani". On the 
negative side, first, the network does have a habit of generating real people, 
even ones not in the data set (e.g., "Tom Jones"). I'm not yet decided whether
this is a problem or not. However, secondly, the training data for the names 
(originally from Wikiquote) has a significant gender bias. It generates names 
like those of famously quoted people, which includes a long historical dimension 
and is not equally distributed. I have taken great care to minimize the impact of
this, but women's names are less frequent than men's, in line with the training
data. But they're no less frequent, which is actually an achievement with these
techniques.

There may be other options for variants with different models inside. One that
definitely appeals is a kind of "fictitious tree" version, which generates a
tree name, a tree description, and a small image (which will need different 
technology, but I've played with generative techniques for this in the past, so
I'm thinking "L systems" will be the main engine there.) For this one, a natural
tree exterior is a must-have. 

