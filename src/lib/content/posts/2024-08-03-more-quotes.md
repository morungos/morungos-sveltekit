---
layout: post
title: 'Engines of rhetoric: the true nature of artificial intelligence'
author: Stuart
card: 'inspirational-quote.jpg'
card_alt: |-
  Inspirational quote: "Whatever you can do or dream you can, begin it.
  Boldness has genius, power and magic in it" Johann von Goethe
summary: >-
  Inspirational quotes are a distinctive genre of text, with a strongly rhetorical
  twist -- that makes them perfect for assessing AI's ability to model the form of texts. 
---

As those of you I've met in person may know, I've been exploring the use of tiny
language models to generate inspirational quotes, ideally on small embedded
devices. So this is part update, and part reflections, given the challenges of
trying to make these models fit for purpose.

## Engines of rhetoric -- a new framing for language models

One of the more interesting claims about language models in particular, is that
they are ["bullshit machines" (Hicks et al., 2024)](https://philpapers.org/rec/HICCIB),
in that they "produce text without concern for its truth", even if they aren't
specifically designed to mislead. I want to suggest an alternative framing, 
which goes a little way beyond that -- that they are *rhetoric machines*: they are
more sensitive to the persuasive forms of language, than they are to its content.

In the classical arts of discourse, the "trivium", there were three branches:
grammar, logic and argument, and rhetoric. Grammar we all know, it's the syntax, the structure
of the language -- these are the building blocks from which people assemble texts. 
Logic is about reasoning, interpreting the words as something which makes sense 
to us in the world. And finally rhetoric is the art of persuasion, the way the
words connect to a listener, and make the language have an impact upon them.

These different aspects of language are not equally immediate in a piece of text.
Logic, in particular, lies deeper, as Chomsky's classic example, 
"colorless green ideas sleep furiously" shows. The syntax is just fine, but
the logic falls down, because it depends on a deeper system of logic: we need
to know what an idea is to know that it can't be green. In effect, grammar
isn't intimately dependent on common sense, but logic is. Therefore, it makes
sense that a language model can be 'better' at grammar than at logic.

But what about rhetoric? Let's look at an example. We could say: "always be kind
and friendly", or we could say "always be friendly, always be kind". Both are
syntactically fine, and logically equivalent, but the second uses a rhetorical
device ([anaphora](https://en.wikipedia.org/wiki/Anaphora_(rhetoric))) to add a
little extra impact on the listener. This is a small and trivial example, obviously, 
but that's the basic principle -- using one of a very substantial battery of 
rhetorical techniques to, literally, *persuade*. 

This is where I'd go beyond [Hicks et al.
(2024)](https://philpapers.org/rec/HICCIB). Maybe, what is happening when an LLM
generates text, is not merely a lack of concern for truth. Language models can
infer rhetorical techniques from text (many of which are much closer to the
syntax of the language than the logic of the message) and apply them to
generated texts, so that they are no longer truth-free bullshit generators, they
are persuaders, engines of rhetoric.

There is more to language, obviously. The aspect that sparked my interest in
inspirational quotes was [genre: clusters of stylistic structures that emerge
within a community](https://www.isls.org/cscl/Euro2001/Papers/28.doc). News
articles are a genre, for example, very different to an office memo, or a blog
post. Genres differ in tone, but also structure, because they have a specific
intent. The purpose of a news article is to communicate facts, the
who/what/where/when/why/how (the five Ws). The purpose on office memo is to
communicate policy, so it doesn't work the same way at all, and, therefore, has
a very different structure. Blog posts have yet another purpose, as do poems,
stories -- and, of particular interest for us, inspirational quotes.

## Inspirational quotes as pure, concentrated rhetoric

The world of inspirational quotes is essentially, pure rhetoric, distilled into
one or two sentences -- to the extent that the rhetorical aspect is much more
impactful than the content. This heavy emphasis on rhetoric should not be a
surprise: rhetoric is, literally, the art of persuasion. The whole point is to
use these techniques to influence people.

Pretty much any rhetorical device you can think of us used, although some are
particularly common. The table below shows many of the most common rhetorical
figures, with examples drawn from the data set. All of these are handily
represented in the training data. In fact, well over half of the quotes in the
data match one or more of these rhetorical forms. Although almost any rhetorical
figure can be used for impact, the various forms of repetition, including
anaphora, antimetabole, diacope, epistrophe, and epizeuxis, these are all used
most extensively. Metaphor and simile are also common, as is alliteration.

| Device          | Description         | Example quote            |
|---------------- | ------------------- | ------------------- |
| Alliteration    | Repeating initial sounds in adjacent words | "Every calm and quiet place is the true temple of the wise man" |
| Anacoluthon     | Changing syntax mid-sentence               | "Eternity is a terrible thought -- I mean, where's it going to end?" |
| Anadiplosis     | Repeating a key word at the end and start of a new clause | "Inner peace can be reached only when we practice forgiveness -- forgiveness is letting go of the past" |
| Anaphora | Repeating words at the beginning of clauses for rhetorical effect | "Everything we hear is an opinion, not a fact -- everything we see is a perspective, not the truth" |
| Antimetabole | Repeating words in successive clauses, but in an opposite order | "There is no hope without fear, nor any fear without hope" |
| Apophasis | Bringing up an issue by explicitly not discussing it |  "Youth is something very new: twenty years ago no one mentioned it" |
| Aporia | Feigned doubt for rhetorical effect | "I confess I do not know why, but looking at the stars always makes me dream" |
| Chiasmus | Repeating syntactical forms, not mere words, in a transposed order | "Failing doesn't make you a failure -- giving up, accepting your failure, refusing to try again, does" |
| Diacope | Repeating a word or phrase, with a single intervening word | "I can see myself before myself -- a being through dark scenery" |
| Dysphemism | Using an offensive term for impact | "Experience is a dear teacher, but fools will learn from no other" |
| Epistrophe | Multiple repetitions of the same word at the end of a sequence of phrases | "Prepare to succeed, plan to succeed, strive to succeed, expect to succeed and you will surely succeed" |
| Epizeuxis | Repeating words in immediate succession for emphasis | "Every blade of grass has its angel that bends over it and whispers: grow, grow" |
| Hypallage | Switching the relationships between words to change the meaning | "Some people say funny things, but I say things funny" |
| Hyperbaton | Using an idiomatic word order for emphasis | "He doubly benefits the needy who gives quickly" |
| Hyperbole | Excessive exaggeration for rhetorical effect | "An undecided man is the worst disaster of the village" |
| Hypophora | Making a point through a question and an answer | "How can we learn to know ourselves? By reflection, never, but by our actions" |
| Litotes | Using a negative -- often a double negative -- to emphasize a point with irony | "Laughter is not a bad beginning for a friendship" |
| Meiosis | Using an underemphasis to make a point | "Geography is just physics slowed down, with a couple of trees stuck in it" |
| Metaphor | Suggesting a deeper analogy between concepts | "Fight falsehood with wisdom not violence, it is rain that grows flowers not thunder" |
| Oxymoron | Combining that usually don't make sense together | "Bitter wisdom is better than sweet folly" |
| Paradiastole | Reframing a vice as a virtue | "Do not be afraid to fail -- most do every day" |
| Simile | Comparing two unlike things, typically using "like" or "as" |  "A conscience is like a baby -- it has to go to sleep before you can" |

[[.pure-table .pure-table-horizontal]]

**Table 1. Some of the more common rhetorical figures found in inspirational quotes**

Enter artificial intelligence, and particularly language models. If you think
about it, it;'s fairly obvious that language models should do particularly well
at rhetorical forms. Many of the patterns are almost entirely syntactic, for
example. And if you think about even Open AI's ChatGPT and its tendency to
"delve" a lot, the one thing that ChatGPT is really good at is rhetoric. It's
convincing. It's persuasive. It might be completely clueless underneath, but
that doesn't matter if your output is convincing enough. 

## Enter the new model

So, I've been developing a newer model for inspirational quotes. Gone is [the old
character-based recurrent network](/projects/quotes/), now I'm using a transformer with rotated
positional embeddings -- this makes it easier for the model to pick up on the
relative distances between tokens, which is central to a lot of these rhetorical
forms. I don't go into the full details of the model yet, but it remains small
-- maybe a million parameters or so. The data set is about 2 megabytes, just over 
20000 quotes so far, but I'm still adding to it.

As an aside, I'm as firmly committed as ever to ethical data, and the other 
advantage of inspirational quotes is that they're really not copyrighted. Each
one tends to be extremely short, maybe 20 words or so, and they're usually public
in nature anyway. Also, there is [Wikiquote](https://en.wikiquote.org/wiki/Main_Page),
so there's a big block of quotations there under a Creative Commons license.

I'm still tuning the model, and there are a few decisions yet to make (for example,
I'm seriously considering a subword encoding, because I think it'll make it easier
for the model to lean on some aspects of grammar, such as pronoun usage). So, this 
is all rough and qualitative evaluation, and a work in progress.

Anyway, let's look at some of the automatically generated output quotes, and see
if we can peek at how well we are doing -- these are in no particular order, and
pretty much at the optimal state of training. Interestingly, the model
definitely is overfitting to some extent, but that does not seem to be entirely
bad for this application. That would mean the model is not fully generalizing,
but is assembling from memorized fragments. That's not necessarily a terrible
strategy for generating quotes. In looking at these, please bear in mind that I
am cherry-picking to some extent -- I'm not rigorously analyzing a specific set
yet. 

> **Example 1 - Grammar issues: "If you want to be a sheep strive, you can touch
> the world comes from the extraordinary and challenges"**

Our first example starts well, but hits a grammar issue fairly soon: "you can
touch the world comes from..." Grammar is one of the areas where there's always
been an issue, and given the whole model is pretty small, it's likely that we
will always get some ungrammatical quotes. But compared to the character-based
model, there is a distinct improvement. The character-based model would
routinely switch pronoun (e.g., the old model's "What we are always an idea and
they show where you live the past"). The transformer seems markedly better at
staying on voice. Grammar issues like these might even be bulk testable, and
this is one of my next steps. We can generate a few thousand quotes from the old
and new models, look at the grammar, and see if there is a change.

> **Example 2 - Rhetorical word salad: "If you learn to be happy, it will be different -- you
> will destroy the essence of being completely like the fruit"**

> **Example 3 - More word salad: "Change is a cause that is a star's
> best mission"**

These examples are not too bad, grammatically, but they really don't mean anything. 
Both are articulate, well structured, and use some punchy language -- but it's 
word salad, fruit salad to be precise. Although to give credit where none is
due (this is an AI model after all), in both cases, switching one word might 
make all the difference.

> **Example 4 - Surprisingly good: "If you want to be a fool, then you will not
> be a problem -- if you want to be a problem, you will never be a fool”**

This one really impressed me -- it's got a lot of rhetoric in there -- although
it still doesn't really *mean* anything (which is, remember, as far as I am
concerned, completely fine). But the rhetorical patterns of antimetabole and
dysphemism are both extremely clear. So, this is pretty good evidence that this
new model is capable of appropriating some interesting rhetorical forms.

> **Example 5 - Acceptable: "To experience is to accomplish sense and move to
> experience"**

There's a small rhetorical flourish here, but it does show the kind of 
output I would accept. It doesn't mean very much, but it does show a 
little anaphora. 

> **Example 6 - Acceptable: "Communication is strengthened by prosperity"**

This example doesn't show any clear rhetorical pattern -- some of the shorter
quotes don't, even in the training data. But it's punchy, and arguably this one
is even true. Arguably, the use of a very short statement is rhetorical -- one of
the common patterns is *amplification*: following on my expanding on a clear sharp
statement. In this case, we can imagine this being expanded.

## Performance of the new model

Given this context, I wanted to start assessing how well the new (transformer)
model compares to the old (recurrent) one. There are many measures we could use, 
but we will start with something simple: how much text is repeated within a 
single inspirational quote?

To test this, I generated 20,000 quotes with the transformer, and rather more
with the old model, then created a matched collection, with each quote from the
transformer paired with a quote of exactly the same length from the recurrent
network. This allows us to control for, for example, verbosity. A quick
statistical analysis shows no real difference (as expected) in the number of
words (Wilcoxon signed ranks, p = 0.13 -- the data is, of course, highly
skewed). But what of the amount repeated?

To assess this, I simply counted the number of characters in repeated words.
this is a very naive measure, but it's reasonable. Sometimes there are repeated
phrases, and common words like "the" and "of", which might get repeated anyway,
should simply *mask* a difference, not undermine it. So, the same test showed
a hugely significant difference, with more repeated words and phrases in the
transformer model, suggesting it is indeed better at rhetoric. There is about
25% more repeating in the transformer results, and this is a hugely significant
difference on a collection of this size (Wilcoxon signed ranks, p ≈ 0).

Obviously, there is a lot more work to do here -- there are many different
kinds of repetition in rhetoric, and I have blatantly blundered in and bludgeoned
all of them into one single score. It deserves a better analysis, and I hope 
one day soon it will have one.

## Reflections and concluding thoughts

Testing a generative AI system is a big challenge, but now that we have
something vaguely resembling a *theory* of what we expect, we can begin. We
could (effort permitting, and it is not a small amount of effort) code our
generated inspirational quotes, and see how well they do against some of these
patterns. Note that as before, we're using a very *very* small model, so that we
can embed it, so grammar is often the first victim. 

But that remains a task for future work. For now, here are the tentative hypotheses
that suggest themselves, now that I've had a little time to immerse myself both
in the original data and the automatically generated quotes.

**1. Our reactions to AI outputs are more influenced by rhetoric than you might think**[^Images]

[^Images]: For those interested in image generation, there are similar
    phenomena. There is, for example, a ['grand
    manner'](https://en.wikipedia.org/wiki/Grand_manner) which plays an almost
    equivalent role to rhetoric in art. So an interesting question is: how much
    of our reactions to generated images are to this stylistic aspect, rather
    than what is actually the subject of the image. Are these styles, too, 
    persuading us of an image, beyond its merit?

It's easy to overlook rhetoric, and assess texts generated by LLMs on grammar
and logic alone. The grammar is the easy part -- parsers were among the very
first applications of statistical language models. Logic and argument is
somewhat harder to gauge -- trying to elicit an argument *at all* from an LLM
can be something of a challenge. They aren't reasoners, but they can do a
competent job of recalling arguments from their training data. 

But what of rhetoric? Qualitatively, there is a difference in my reaction
to the quotes that use rhetorical devices extensively. It changes the way
I react. There is something else, therefore -- something beyond the words, and
something simpler than the argument -- that shapes my reaction. The way I 
react to "Life is magical &mdash; you are magic" is simply not the same as 
"Life is good and you are special". And it is both plausible and likely that
this aspect of text is exploited, unthinkingly, by large language models.

**2. Language models are *much* better at (some) rhetoric than you might think**

Rhetoric is distinct from both grammar and logic, but some of these devices are
remarkably easy for language models. Repetition, for example -- there are quite
a few types of repetition in rhetoric, and they're all well represented in
inspirational quotes. This, and this is borne out by the data above, suggests
that even very small language models can acquire (some) rhetorical devices.
Others are very much harder, so I don't yet want to assert that language models
are really displaying them -- at least not without a little more evidence.

What's more interesting is the effect of rhetoric: it lowers our guard; it
persuades us that there is something there, even all other evidence to the
contrary. Even Open AI's habit of using "delve" is a peculiarly evocative word,
very consistent with a rhetorical spin. The problem is, they're so good at
rhetoric that they persuade you they can understand, that they are manipulating
meaning -- but they totally aren't doing that at all. 

**3. Measuring rhetoric is possible, but harder than you might think**

There are a lot of moving parts to rhetoric -- which makes sense, given that it
is all about how to trigger people. Some of the techniques, like repetition, are
easy to measure. Others, like metaphor, can be very subtle -- and very easy to
project onto a piece of text even when not intended. And some, like
[enthymeme](https://en.wikipedia.org/wiki/Enthymeme), depend entirely on
unstated knowledge assumed on the part of the listener. I don't even know where
we could begin to assess this in a language model.

**4. Inspirational quotes, as a genre, are a wonderful case study for language as well as AI**

All in all, inspirational quotes are a kind of textual microcosm, which 
deserve a little more study and consideration. It's very easy to focus on
big documents and big collections. This is a very small one. The advantage of
small collections like this is that we, as humans, are not so deluged by 
the data that we cannot continue to build theories about it. 

And this is why rhetoric is interesting. It is not a lens that we are
seeing used with Open AI, Google, and other large language models. But, given
that the point of rhetoric is to persuade, perhaps more attention should be
paid to this fascinating aspect of human language.

## References

[Hicks, M. T., Humphries, J. & Slater, J. (2024). ChatGPT is bullshit. 
*Ethics and Information Technology* (2024) 26:38.](https://doi.org/10.1007/s10676-024-09775-5)
