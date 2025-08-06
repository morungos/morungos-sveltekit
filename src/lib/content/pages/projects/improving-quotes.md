---
title: Improving quote generation on small language models
draft: true
author: Stuart
---

This is a follow-up on [my earlier work on quote generation](/projects/quotes), so you
may want to read that for context.

This follow up is digging into some of the deeper issues. In particular, the generated
quotes are not all that great, and I am sure we can tweak things to generate better 
models. 

## The architecture

With respect to the architecture, here are at least two actionable things in
mind.

### 1. The model architecture is probably a limiting factor

We're currently using a multi-layered recurrent neural network, and this is not
great at long term relationships within texts. Let's look at a real quote:

> "Nature without culture can often do more to deserve praise than culture without nature"

The key thing to observe here is the repeated words, especially in a reversed order. 
This is a common rhetorical device. But this is not the kind of thing recurrent neural 
networks do all that well. Instead, activations in their hidden states will normally
decay over time. It is almost as if we need some convolutional aspect to our model, so
that we can assemble them as a single unit, rather than purely a character at a time.
This is definitely the kind of thing transformers are better at than recurrent networks,
so one option would be to change architecture, looking at models that are better at these
long term relationships in text.

### 2. Beam search is stupid

Virtually all token by token models use beam search. They might have various rules 
for determining the next token, but basically, they all share the same problem. If you
*always* choose the "most likely" token next, you aren't necessarily optimal over a 
series of tokens. However, I have never seen anyone actually address this problem 
properly. The "right" solution is a lazy Viterbi algorithm or similar, i.e., pursue
a window over a set of next tokens, building up a most probable sequence, and emitting
tokens when they are known to be followable by reasonably valid successors. Lazy Viterbi
is not trivial, it's actually more than a bit nasty to do, it should produce better
results. 

Of course, if we change architecture radically through #1 above, then #2 is a moot point.