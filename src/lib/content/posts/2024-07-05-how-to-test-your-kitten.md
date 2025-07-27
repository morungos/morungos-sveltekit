---
layout: post
title: 'How to test your kitten'
author: Stuart
background: '/img/posts/kittens.jpeg'
summary: >-
  How do we build ways to think about what's going on inside a really
  complex system, such as a large language model or a kitten?
image: '/img/posts/kittens.jpeg'
image_description: |-
  Two small kittens, one black and white, the other a grey tabby, cuddling each other.
---

I have spent a fabulous couple of days at [a workshop on AI and testing run by
James Bach, Jon Bach, and Michael
Bolton](https://www.satisfice.com/blog/archives/487686), thinking about the
challenges of testing (and building) systems which have significant and complex
AI going on inside them. I have always admired this testing community, and its
drive to make technology better. And they've given me much to think about, which
is also great.

I couldn't help but admire the folks who are testing and building systems which
have big and complex AIs inside. They have real problems they are trying to
solve, and for which AI can show real promise, and they are on the sharp end of
getting an AI system to do what they need it to do. Their persistence in this,
when AIs routinely act up, is remarkable.

Listening to them discuss the challenges of design applications powered by large
language model, it reminded me of [cat
herding](https://www.youtube.com/watch?v=vTwJzTsb2QQ). In fact, these LLM
components reminded me of small and wayward kittens, sometimes predictable,
sometimes small agents of chaos and destruction. So, how do you test something
that does not behave like a "machine", but behaves more like something wayward,
something willful.

## How to test your kitten

As anyone who has ever had one will tell you, kittens are not easy to predict.
They do not have a reset button that puts them into a known state. Even if you
interact with them in an extremely consistent way, they may react differently
every time. They might be hassling you at feeding time, and then suddenly decide
they don't like their brand of food any more. Kittens are small agents of chaos.
How can you test something like that? 

The problem becomes even worse if you try to put your kittens to work. Will they
catch mice? Or will they just watch them for a bit, and then take a nap. And
that's entirely natural cat behaviour -- what we're attempting is to direct LLMs
and harness them into some extremely complex and demanding cognitive behaviours,
it is like trying to get your kitten to assemble IKEA furniture

<figure class="figure w-100" style="text-align: center">
  <img class="img-fluid" src="/img/posts/morag-kitten.jpeg" style="width: 500px;"
       alt="A grey tabby and white kitten, with amber eyes, white paws, and a black nose, looking down from the top of an armoire">
    <figcaption class="figure-caption">
    Figure 1. Morag as a kitten
    </figcaption>
</figure>

We have developed quite a few tools for dealing with complex and unpredictable
systems, especially in cybernetics (Weiner, 1948; Ashby, 1957). You might think
that cybernetics doesn't work well as a theory of kittens, but it was certainly
intended to. Weiner's (1948) concept was "the science of control and
communication, in the animal and the machine”. In effect, with cybernetics, we
have graduated to seeing things like toasters -- and kittens for that matter
-- as things that have *behaviour*. It is not what they are made of that
matters, it is what they do.

One of the strategies we have adopted from cybernetics is to think of these
things as of they are 'black boxes' (Ashby, 1957) -- where we cannot know what
they are made from, so all we can do is make inferences from their behaviour. To
quote Ross Ashby: 

> The Problem of the Black Box arose in electrical engineering. The engineer is
> given a sealed box that has terminals for input, to which he may bring any
> voltages, shocks, or other disturbances he pleases, and terminals for output,
> from which he may observe what he can. He is to deduce what he can of its
> contents. (Ashby, 1957, p86)

This gives us a methodological framework where we are no longer prejudiced by
our knowledge. Instead, we have no option to become more experimental, more
systematic in our exploration, and from those small experiments, make hypotheses
about what is inside the box, whether it is a set of wires, a complex computer
program, or even a small kitten. And this is testing: we are putting together
theories that explain why we see what we see.

## Cats and boxes

The academic literature has more than its fair share of cats in boxes. Schrödinger's
imaginary experiment is perhaps the most famous, but early psychology tended to
do it for real -- Edward Thorndike created "puzzle boxes" to explore how animals
could learn to solve problems. These experimental setups allowed him to explore 
learning behaviour in complex and unpredictable things, i.e., cats. Thorndike
knew what was going on inside the box, but he didn't know what was going on inside
the cat. Again, the goal was to control variables -- just as Ashby did with
electrical boxes -- to make experimenting and theorizing easier. Skinner took
the box concept a little further with the "operant conditioning chamber", typically
using  a series of levers and rewards to simplify things down, making it easier
to assemble theories and explanations.

<figure class="figure w-100" style="text-align: center">
  <img class="img-fluid" src="/img/posts/irritant.jpeg" style="width: 500px;"
       alt="A grey tabby and white cat, sitting inside a cardboard box labelled 'Irritant'">
    <figcaption class="figure-caption">
    Figure 2. Morag in a box -- "if I fits I sits"
    </figcaption>
</figure>

All of these methods, though, have a single basic underlying principle -- they are
all based on one or another flavour of *behaviourism*. This is not necessarily a
bad thing in a setup like Ashby's, trying to make sense of the black box. We could
even argue that people can be pretty good *natural behaviourists*. We are good
at theorizing what might be going on inside the box -- or the kitten. 

## Dennett's stances: testing with manifest complexity

But a kitten is not a black box. We know -- or at least we think we know -- what
is going on inside, to some small extent. We know that kittens are unbelievably
complicated little things, so complex that we really can no longer think about
them as designed objects. That whole way of thinking breaks down. Instead, we
have to think about them as intentional beings, with their own desires, beliefs,
emotions, moods. 

Daniel Dennett outlines three stances[^Dennett], ways of thinking about something. We
aren't doing this thinking for any abstract reason: we're trying to predict how
it will act. In other words, we are testing it. For example, if we want to pick
up a kitten, Dennett's physical stance, which might help us deal with "if I pick
it up it, will it feel heavy?" Then, there is the design stance: "if I pick it
up it, will it move?" And finally, there is the intentional stance: "if I pick
it up it, will it try to bite me?" Each stance has a different way of thinking
about the same kitten.

[^Dennett]: Dennett was far from the first to explore these three levels -- it
    was a common theme in cognitive science in the 1970s. However, Dennett is 
    probably the most explicit one to put these in the eye of the beholder, rather
    than as something 'real'.

| Stances   | Sources of information |
|-----------|----------|
| Physical stance | e.g., what it is, structure, common-sense physics |
| Design stance | e.g., what it does, behaviour, causal inference |
| Intentional stance | e.g., what it says, communication, common-sense psychology |

But beyond Dennett's philosophy, these are also different ways of framing our
testing. Each 'stance' is built up of different systems or packages of theories
(we might call them frameworks), and each stance uses different sources of
information, and different modes of reasoning. What is particularly interesting, though, 
is that the stance we choose depends on what we know about the thing we're looking at.

Dennett tells a delightful fable about [two black
boxes](https://www.researchgate.net/publication/28762339_Two_Black_Boxes_a_Fable)
which illustrate this point. In Dennett's story, there are two connected black
boxes (yes, black boxes again). The first has two buttons: 'A' and 'B'. The
second has three lights: red, green, and amber. Pressing 'A' on the first box,
caused the red light to flash, pressing 'B' caused the green light to flash. As
an experimenter, this looks like an extremely simple system. But -- when people
took the time to look inside, in fact what was going on was very different:
pressing 'A' caused the first box to assemble what it believed was a true
statement, translate it to text, and send it to the second box. The second box
had an entirely different system that took the text, interpreted it as a
statement, and then decided whether or not it was true, and flashed the
appropriate light. 

Dennett's point is that putting things in black boxes makes us see the contents
as more 'designed' things (by removing information we might otherwise use), and
for that reason, tend to use *behavioural* (design) language, theories, and
methods with them. And when we do so, we can massively oversimplify (or, indeed,
over-complicate) what we think about what's happening inside. And as soon as we
open the boxes, all of that goes out of the window -- as soon as are confronted
with the true complexity, we switch to seeing the systems as *intentional*, not
designed.

In other words, the stances we can take shift depending on the nature of the
thing we're looking at, and what we know about its insides -- but, crucially, we
can't use two different stances at the same time. They're separate and distinct from each
other. We either think of a volcano (to pick an example) as 'caused by' a buildup
of something, or as 'caused by' an angry deity, but not both at the same time. We might
switch between them depending on context, but the stances are mutually exclusive. Our
explanatory theories only achieve consistency inside one or another stance.

Now think about the likes of ChatGPT, or any large language model. These are
just like Dennett's black boxes -- superficially simple but internally utterly
incomprehensible -- even to their developers, for the most part. If we think
about them as black boxes, we focus on behaviour. But that's misleading, because
the complexity is conspicuous, undisguised, and beyond our reasoning capacity --
central to the narrative in fact -- and it affects how we have to think and
theorize about it. That grasp of their complexity forces us to treat the models
as *intentional* things -- and our entire ability to frame what they do within a
design starts to degrade. 

## So, how do we test our kittens?

The careful observer might have noticed that I have failed to answer the
question: how should we test our kittens? How can we build systems with tiny
agents of chaos inside, in such a way that we can still control them into
functioning as part of a cohesive and effective system?

<figure class="figure w-100" style="text-align: center">
  <img class="img-fluid" src="/img/posts/cat-dressed-vintage-photo.jpg" style="width: 500px;"
       alt="Two tabby kittems, dressed for work">
    <figcaption class="figure-caption">
    Figure 3. Putting kittens to work -- always harder thank it looks.
    Used under <a href="http://creativecommons.org/publicdomain/zero/1.0/">CC0 Public Domain</a>
    </figcaption>
</figure>

I could reply, flippantly, that diagnosis of the issue is still important and
helpful if we want to move forward, That it is important enough to simply
recognize that extremely complex systems that we know to be beyond our
design-level understanding are outside the normal frame of the black box, despite
the best intentions of Ashby and cybernetics.

But I will go further than that. Let's think back to the old school
psychologist's usage of boxes -- their behaviourism usually tried to play down
what was going on inside. In the limit (Watson's methodological behaviourism)
what was going on inside the box was inscrutable enough that it was outside
science. More interesting versions (Skinner's radical behaviourism) included
reporting on inner states as behaviour that was important to study. Watson's
behaviourism is still alive and well in AI today, as machine learning by and
large regards all hidden states as only meaningful for *post hoc* explanations,
and possibly not even then. In either case, behavourism isn't all that helpful
when we want to make or explore theories about what's going on inside a large
language model. 

Where else can we look? Another option would be to look more at qualitative
methods, and in particular, methods such as discourse analysis and grounded
theory, which don't assume a nice clean boundary wall around the system you're
assessing. Remember, we are trying to build a theory of what the system under
test will do, and we can never do that without full respect for the context.

Some may laugh at the idea that we can test a kitten using discourse analysis.
Although I'd counter that while, yes, kittens don't talk, they are pretty good
communicators -- especially at feeding time. They use body language extensively
-- tails and ears are very expressive. We know what our cats think surprisingly
well, or at least we think we do[^Wittgenstein]. We learn to recognize their
different vocalizations, the angles of their ears. We share their environment,
and much of their biology, so we readily project our experiences onto them.

[^Wittgenstein]: Wittgenstein famously said, "If a lion could talk, we could not
    understand him". The problem is, even if my kitten doesn't talk, I still do
    *partly* understand her. Unlike tuxies, language and understanding aren't
    black-and-white. We both share the same physical environment, we can both be
    hungry, too hot or too cold.

## What's all this got to do with testing AI?

I admit, I was fascinated at the workshop. I was constantly surprised by the
richness of the theorization coming from the testers, especially on the details
of the language coming out of these large language models. All of them[^AllTesters]. Although
I was maybe less surprised by Michael Bolton and James Bach doing this,
because I know they've been deeply influenced by sociology. They're *always*
peeling away the layers of language, why should I be surprised they do this with
AI and its communications? They're putting together some very good ways of 
assessing systems including AIs, and if you need people to assess your systems, 
you should definitely talk to them.

[^AllTesters]: I am inspired by all the people at the workshop: James Bach, Jon
    Bach, Bernie Berger, Michael Bolton, Julie Caboutin, Alexander Carlsson, Nate Custer, Ben
    Johnson-Ward, Anna Royzman, Ben Simo, Olesia Stetsiuk, and Vimmi Walia. 
    Thank you to all of them.

What's more -- this method was definitely working. The subtlety, the nuances 
of the language were central to handling these systems.

So I believe this is how you start to evaluate complex systems -- you have to
embrace their complexity. Design thinking about the mechanics becomes almost
impossible due to the detail from that complexity, but you will probably switch to
intentional thinking instead -- in fact, you probably won't even realize you're
doing it. That will mean embracing the richness of language, but -- I think --
that's a good thing.

## References

[Ashby, W. Ross (1957). *Principles of cybernetics*. London: Chapman & Hall.](http://pespmc1.vub.ac.be/books/IntroCyb.pdf)

[Dennett, D. C. (2010). Two black boxes: a fable. *Activitas Nervosa Superior* *52*(2), 81-84](https://link.springer.com/content/pdf/10.1007/BF03379570.pdf)

[Weiner, N. (1948). *Cybernetics, or Control and Communication in the Animal and the Machine*. Cambridge: MIT Press](https://direct.mit.edu/books/oa-monograph/4581/Cybernetics-or-Control-and-Communication-in-the)

## Images

Photographs are copyright by Stuart Watt, except for Figure 3, which is in the public domain.
