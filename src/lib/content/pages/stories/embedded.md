---
layout: page
title: Tiny embedded language models
background: '/img/bg-about.jpg'
---

I'd been working for a while supporting some real-time embedded development
which used high-end visual processing using [OpenCV](https://opencv.org), as
part of the EU's [CERBERO](https://www.cerbero-h2020.eu) project. This involved
running AI algorithms on relatively low-end hardware, such as Raspberry Pis and
the Nvidia Jetson Nano. 

But I'd also been experimenting with microcontrollers -- after all, the real
goal was to get AI into hardware deployments where we could leave them running
for weeks, or even months, with relatively small batteries.

So I decided to make a small device which could generate and display inspirational
quotes in an e-ink display, using a couple of small language models. 

<figure class="figure">
  <enhanced:img src="$lib/assets/pages/IMG_1141.jpg" 
       alt="Chart of bias effects by temperature"></enhanced:img>
    <figcaption class="figure-caption">
    The hardware implementation, showing a Raspberry Pico microcontroller 
    driving the e-ink display
    </figcaption>
</figure>

## Why inspirational quotes?

The nice thing about inspirational quotes is that they have a definite
structure. They have a rhetorical aspect to them which simple sentences do not.
I've long been fascinated by the structural and rhetorical aspects of language
and I wanted to see how well a small language model might pick up on them.

The other nice thing about inspirational quotes is that much of their impact 
depends on the reader's projection. We can, and do, read much more meaning into
them than might really be there. So, even a bad inspirational quite -- so long
as it has the right rhetorical structure -- might work. 

For example, think about this typical example:

> "If you cannot do great things, do small things in a great way” -- Napoleon Hill

See that it has several repetitions ("things", "great") and that it opposes
"small" and "great". Repetitions and oppositions like this are extremely common
in inspirational quotes. Of course, there are quite a few other patterns too. I
wanted to see if a language model might learn these and similar patterns, and
then abuse them in a way that reveals how much of what happens when we read
these is rhetorical rather than semantic.

## The hardware

I used a Raspberry Pico microcontroller, because it was cheap and had pretty
good storage, all of a couple of megabytes of flash memory. Some of the fancier
Arduinos (like the Nano Sense) would also have worked, but they were a lot more
expensive, because they had additional sensors that we didn't need. The only
other component of interest was a basic e-ink display with a controller so I
could drive it from I2C. 

Because I used a Mac, and because cross-compiling from a Mac was hell-on-earth,
I also used a Pi 4 with a desktop interface, and while most of the development
was done in a Mac, I always used that for deployment.

## Training data

First, I needed a decently large data set of inspirational quotes. This was 
curated from whatever source I could find that were usable without licensing 
issues. [WikiQuote](https://en.wikiquote.org/), for example, was a major source.
This involved a decent amount of crawling and parsing to get it into a form
which was clean enough to be useful for machine learning. Most of that was
done using Perl and/or JavaScript.

In fact, I created two datasets: one for quotes and a second for people's names.
I wanted the device to generate fictitious supposed authors as well as
fictitious quotes, and two separate models made that simpler. 

The basic architecture was a character-based recurrent neural network. Transformers
were still quite new, and to get the model small enough, the vocabulary needed to be
tiny. After all, the hardware put a hard limit: 2mb of data (including the code),
with 32 bit floats required the model to be around 400k weights max. Quantizing 
would allow much richer models, but the volume of training data was the bottleneck
anyway, it turned out.

Training was done in PyTorch using Python on a Jetson Nano, using CUDA acceleration,
and would typically take a few hours to converge to something decent. 

## Productionizing

The next step was to get this running on an ARM-based microcontroller with limited
memory. 

The simplest solution involved the following steps:

1. Train the model, verify it, and save
2. Convert the model to [ONNX](https://onnx.ai)
3. Convert the ONNX model to pure C code
4. Link and compile with a basic C driver to generate quotes
5. Link with the rendering code to drive the e-ink display

Only the last step required the embedded hardware. In practice, to verify it, I
build a tiny random number generator with identical functionality for Python, JavaScript, 
and C, and used that to ensure that the generation system behaved identically in C 
when compared to the non-ONNX version, and with the ONNX version driven with a 
known and official runtime. 

At first, the C implementation from Step 3 (done using [kraiskil's](https://github.com/kraiskil) excellent
[`onnx2c`](https://github.com/kraiskil/onnx2c) compiler) was out of line compared
to the PyTorch and ONNX/JavaScript implementation (which were, thank goodness,
identical). It transpired this was a logic error in one of the ONNX operators,
and when fixed, that behaved identically too. 

The testing process here was more laborious that this suggests. Initially, all I
knew was that the C version was 'bad' -- but it still resembled language so it 
wasn't complete junk. It took a lot of side-by-side data comparisons from the 
different implementations, and the key step of both synchronizing and seeding 
randomization so it was identical across all versions helped. The `onnx2c` code
was relatively easy -- after all, it translated the model into relatively readable C, so it was
easy to instrument and trace. The PyTorch code and the ONNX/JavaScript versions
were much harder, as they depended on acceleration technology which often made
the tensors harder to probe.

Anyway, when we had full agreement, we could move to Step 4, where we had a
working C program generating quotes, it was then straightforward to integrate
that with The Pico libraries, and finally to drive the e-ink display with the
generated content.

## Current state

And that's where it is now -- the model does run effectively and generates
quotes at around the speed of a couple of characters a second. The slow performance
is very largely due to using floating point numbers for weights, because floating
point is emulated on the Pico. Quantizing would both speed up and reduce the size 
of the models, but so far it's proven something of a challenge to make it work with
ONNX well enough to get good quotes. 

<figure class="figure">
  <enhanced:img src="$lib/assets/pages/IMG_1169.jpg" 
       alt="Chart of bias effects by temperature"></enhanced:img>
    <figcaption class="figure-caption">
    One of the generated quotes, on the e-ink display
    </figcaption>
</figure>

## Scots Proverbs

I built a second, more recent, version of this in my [Random Scots
Proverbs](https://bsky.app/profile/scotsproverbsbot.bsky.social) bot, initially
on Twitter, but since I have bailed on Twitter, I moved it to Bluesky -- which
was surprisingly much simpler, with fewer API shenanigans.

This bot posts images a few times a day, integrating the generated proverbs into
images, adding an `alt` tag, and posting. All is done using public domain
sources for the original proverbs, and my personal photographs as the
backgrounds, so it is copyright safe. ([*For more information on this project
and the process I used, read this
article*](/2022/09/05/scots-proverbs/))

<figure class="figure">
  <enhanced:img csrc="$lib/assets/pages/scots-proverb-1.png" 
       alt="AI generated Scots proverb against a moody mountainside loch with low cloud. “The wird o’ the hand is worth a bind o’ the wind”"></enhanced:img>
    <figcaption class="figure-caption">
    An automatically generated random Scots proverb, generated using another
    tiny embedded language model. The background image is from my personal 
    photo collection.
    </figcaption>
</figure>

## Gotchas

There are a few challenges with a character-based model. It is capable of
inventing words, for example, so even when a given word isn't present anywhere
in the training set, it may still show up in output. In fact, there are a few
generation parameters that influence this:

- Temperature: this affects the sharpness of the distribution of next token
  choice; with a high temperature, less likely tokens are more likely, but with
  a low temperature, the text is (small 'c') conservative, and more 'typical'
  next tokens are preferred.
- 'Top *p*': this sets a cutoff for unlikely next tokens, allowing very unlikely
  next tokens to be prevented. For example, 's' is rarely followed by 'v', so
  with a decent cutoff this never happens, helping generated text avoid
  unpredictable contexts. 
- 'Top *k*': another kind of cutoff for next tokens is simply to limit the
  number of candidate tokens at any step. If only 20 tokens are permitted, at
  any step, only one of the most likely 20 next tokens will be generated. Again,
  this helps prevent generation getting bogged down. 

Getting these right can take a little trial and error, but fortunately these
aren't used during model training, so you can always experiment with your better
models.

For more on how these factors affect the text generated, 
[I wrote a slightly more detailed blog post on the issues](/2022/01/09/language-model-bias/).