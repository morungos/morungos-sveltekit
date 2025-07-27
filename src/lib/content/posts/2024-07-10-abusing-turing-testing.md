---
layout: post
title: 'Misusing Turing for profit: 7 deadly sins of Turing tests in industry'
author: Stuart
background: '/img/posts/48349530722_4b0e1706ac_k.jpg'
summary: >-
  How does the Turing test work? Well, it isn't a definition of intelligence. It
  is rooted in cybernetics, and explores the differences between machines and people.
  Here are some of the many ways it can go wrong.
image: '/img/posts/48349530722_4b0e1706ac_k.jpg'
image_description: |-
  A mural of Alan Turing
---

Okay, I've just about had it with folks in today's artificial intelligence community misusing the Turing test.
I'm so *done* with the lot of them. They're making all sorts of misrepresentations and misunderstandings,
sinning left, right, centre. 

Here, then, is my definitive guide to what AI is doing, and why it is (almost)
always nothing to do with either Turing or testing. If you haven't read the
original [*Computing Machinery and
Intelligence*](https://redirect.cs.umbc.edu/courses/471/papers/turing.pdf), I
suggest you dip in, it's very readable and is a useful background.

## Abusing the Turing test

There are two classes of abuse of the Turing test that make me cross, and I've chosen
two recent papers to illustrate them:

1. [The "GPT-4 paper" (Jones & Bergen, 2024)](https://arxiv.org/abs/2405.08007) -- this kind of paper
   defends indistinguishability, and follows the pattern of the [Loebner
   Prize](https://en.wikipedia.org/wiki/Loebner_Prize). These *supposedly*
   follow the 'real' format of Turing's original 
   article, but by and large, what they're really assessing is how
   well they can fake human-like behaviour enough to get away with it.

2. [The "exam paper" (Scarfe *et al.*,
   2024)](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0305354)
   where full indistinguishability isn't an issue -- instead, these focus on one
   specific measure (in this case, exam scores), and accordingly,
   use indistinguishability on that specific score. The exam paper raises a number of
   other methodologically-suspect issues, but here I'll focus on the Turing test ones.

It's important to point out that the  original Turing test was neither of these:
it was a format for exploring the nature of humans and machines, and putting
together an experimental framework for exploring both the differences and the
similarities. This comes from the Turing test's roots in cybernetics, as I'll
discuss in a moment. What both the papers have in common, though, is a range of
grievous *sins*, sins that reveal neither of them is doing what Turing had
intended. 

I will skip over general criticisms of the Turing test as a test for "real"
intelligence, because that is not what is happening in either of these papers,
or in the industry as a whole. Many books have been written on that, and many of
them are a great read, philosophically. Instead, I'll focus on the sins. But first,
a word on the context of the Turing test idea.

## Context: cybernetics, Wittgenstein, and other animals

People often forget when Turing was writing. It was the late
1940s, and Turing was one of the members of the [Ratio
Club](https://www.wired.com/story/ratio-club-turing/), an elite dining circle of
innovative thinkers -- none at the level of professor -- which became the very
heart of the UK cybernetic community. Other notable members included Ross Ashby
and Grey Walter, Horace Barlow, and Albert Uttley -- one of the very early
pioneers of neural nets. This was a powerhouse of ideas, all oriented to
cybernetics, and Turing was immersed in it. 

A key tenet for cybernetics is that existence of a qualitative distinction
between machines, animals, and even people, is open to question. There are
commonalities, and lots of them. As Ashby (1957) put it: 

> Cybernetics [...] takes as its subject-matter the domain of “all possible
> machines”, and is only secondarily interested if informed that some of them
> have not yet been made, either by Man or by Nature. 

So here's the context: cybernetics was emerging, and looking to build a new
class of theories, theories that explained the behaviour of machines, animals,
and people. The people involved in the Ratio Club shared a wide range of
interests, from astrophysics, to robotics, to neurology, but that was the
challenge that had brought them together. Turing's later work, and the Turing
test, grew from this fertile ground.

Second, and this is partly conjecture, Turing had attended quite a few lectures
by Wittgenstein, and they had had significant debates. It is not much of a
stretch to think that Wittgenstein’s concept of languages games may have struck
a chord with Turing, and might have suggested fragments of ideas which Turing
assembled through the imitation game — pure game, and pure language, as an
experiment on the essence of human intelligence. It's doubtful that the Turing
test had an origin Wittgenstein would endorse, but he did seem to recognize it. 

## The seven deadly sins of Turing tests (in industry)

So, let's come back to our two papers, and look at some of the deadly sins
involved in abusing the Turing test -- especially in industry, and when applied
to real 'systems'. I'm focusing on industry here, and real systems, because a
lot of the academic literature on the Turing test is more abstract, and imagines
'perfect' systems that might exist, not the ones that do, today. But there are
different pressures on industry: marketing, publicity, there are a lot of
reasons to promote technology for corporate gain, and that is where people tend
to stray from the righteous path.

### Sin 1: behaviourism

Our first sin is behaviourism — we immediately disregard all sources of
evidence that are not pure behaviour. We do not, for example, look inside the
language model, to see if there are patterns that are in any sense “valid”. We
not even attempt to build any theories or explanations that involve inner states
of the thing. All that matters is behaviour, the whole behaviour, and nothing
but the behaviour.

Neither paper really digs below the behaviour itself. The GPT-4 paper did start
to elicit the reasons behind the judgements -- although, fascinatingly, these
reflect more on the human critical decision-making in assessing
indistinguishability, than anything much to do with the systems. And this is a
grave methodological omission: a better strategy would have been, for example,
to use protocol analysis, and to explore the kinds of theory-building, or
whatever it was the assessors were doing. *That* is getting towards testing, and
they failed to do it, which makes me sad.

### Sin 2: anthropomorphism

The second sin is anthropomorphism. I do not mean Thomas the Tank Engine here,
but the use of subtle cues that might affect judgements about behaviour. Labels
affect judgements -- a lot. For example, [Langer and Abelson
(1984)](https://pubmed.ncbi.nlm.nih.gov/4814097/) conducted a beautiful study
asking people to rate a video, which was labelled either "job applicant" or
"patient" -- the exact same video was seen differently because of this
labelling.

Note that this particular sin is related to the [ELIZA
effect](https://en.wikipedia.org/wiki/ELIZA_effect), but they're not the exact
same. The sin is explicitly use an interface that labels in such a way as to
hint at there being a human there. This is a bias, so it is doubtful we can
eliminate the effect entirely, but we can be mindful of it, and try to mitigate
it.

In fact, the GPT-4 paper discusses in some detail the tinges of anthropomorphism
(typing delays, use of common names) that were layered on through the interface.
These will inevitably affect the results -- this is a second methodological
slip. It is possible to control the variables that affect our 'pre-judgements',
such as these labels, without raising expectations. The exam paper also
anthropomorphised, creating alias student accounts for the ChatGPT exam
submissions. 

### Sin 3: Breaking Goodhart's Law

The third sin is breaking [Goodhart’s
Law](https://en.wikipedia.org/wiki/Goodhart's_law), which runs: “when a measure
becomes a target, it ceases to be a good measure”. If we use Turing-like testing
to explore, that’s one thing — if we make it a target, and especially if that
target is linked to money, the whole approach breaks down. For example, Turing's
original article -- somewhat casually -- mentions a five minute time, under the
corruption pressures of Goodhart’s Law, that then becomes a fixed limit, to
maximize indistinguishability. We literally corrupt the test to secure the
target, and the funding, that we need. 

Again, both papers push at the very limits of Goodhart's Law. The exam paper
created something of a furore over the accuracy of fake exam detection: it's
very possible that this is partly 'leakage' from the determination to have
reliable metrics for exam assessment. The GPT-4 paper hedges a bit more, but
still goes there, using the pass rates to reach a stronger conclusion than
warranted: "on the basis of this definition, GPT-4 passes this version of the
Turing test" (Jones & Bergen, 2024).

### Sin 4: quack psychology: operational definition of intelligence

The fourth sin is a kind of "quack psychology", by which I mean an informal rule:
“if it looks like a duck, and quacks like a duck, it is a duck”, follows from
behaviourism. In effect, it *defines* a suitable set of behaviours as
'duckness'. Fortunately, neither of our two papers goes quite that far. 

It is a slippery slope, though. It is very easy to fall into the trap of 
considering "passing" (whatever *that* means) a Turing-style test as a 
literal definition of intelligence -- and hey presto, all you need for AGI
is some stupid system that has a big enough collection of scripts to fool 
enough observers. 

### Sin 5: confusing indistinguishability and validity

Our fifth sin is to confuse indistinguishability and validity. For example, 
the exam paper: what do we know if a set of human graders cannot tell AI-generated
exam scripts from human ones? 

We can also reason the opposite way: an AI system could exist that would
generate extremely valid exam responses, but be readily distinguished from 
student scripts. That tells us it is possible to be valid while being distinct,
which alone should tell us there is something methodologically terrible about 
using an assessment of indistinguishability as a proxy for validity.

Both papers fall into this trap[^Validity]. The exam paper is arguably even worse, as the
authors intentionally did not inform graders about the presence of AI scripts.
When the basis for your method is indistinguishability, yet you are not even
alerting participants to that, that is definitely ethically shady. 

[^Validity]: 
    To be fair, the whole of the artificial intelligence community tends to
    struggle a bit with the concept of validity. That may be partly due to the 
    scale of the data -- if you are confronted with petabytes of training data,
    from disparate sources, what is "valid" anyway?

### Sin 6: confusing benchmarking and testing

The sixth sin is to confuse testing with *benchmarking* -- and arguably, most of
what we see labelled as "Turing test" is not testing at all (in a meaningful
sense of the word), but benchmarking.

What do I mean by that distinction? To be a test, it should assess some aspect
of the quality or the performance of the thing -- and neither paper here really
assesses quality. What they do -- all they do -- is *compare* human and
artificial systems, statistically, on the aggregate level. In the case of the
exam paper: is the grade of real students 'better' than the grade of ChatGPT -- that is
pure benchmarking, we are saying nothing about the actual quality of ChatGPT by saying
this. 

Don't get me wrong: I like benchmarking. It is useful. But it isn't (usually)
*testing*, and it certainly isn't the kind of testing that Turing had in mind.
It also isn't the kind of testing that Ashby explored in cybernetics: assembling
theories about black boxes. 

But here's the rub: the combination of benchmarking and indistinguishability is
an extremely weak basis to assess systems on. It says nothing about the quality
or performance of the systems. It says nothing to guide future work. It says
nothing about whether they are 'good enough' to use. It looks impressive,
because you've got a lot of bar charts. And that's it.

### Sin 7: hype

The seventh sin, and I have saved the worst for last, is hype. It's arguably
rooted in greed, so it's the one that might actually be a mortal sin. The others
might earn you a little time in methodological purgatory, but hype: that
deserves a taste of hell. And sadly, within AI, there's a lot of it about -- both
papers here are exploiting the Turing test for its brand recognition, not because they're
serious about assessing AI systems.

In fact, I could even formalize this as a law of AI:

> If your paper is using "Turing test" in the title, applied to a real system,
> chances are it is hype.

## Turing tests: theory-building, not benchmarking

Now, think back to our acknowledgement of the Turing test's origins in the
UK cybernetics community, and particularly the Ratio Club. Like Ashby's 
"black boxes", the Turing test is a format for experiments[^Experiment], for making
inferences about what's going on inside a system. 

[^Experiment]: 
    Turing himself makes this point explicitly: "The only really
    satisfactory support [...] will be that provided by waiting for the end of the
    century and then doing the experiment described" (Turing, 1950).

The imitation game is, after all, a *game*. There are rules and strategies. It's
fascinating how little attention has been put on how people make
judgements[^Watt] -- even though, for instance, the GPT-4 paper hints at some
very intriguing processes. People are not just exchanging words at random, they
are deliberately experimenting, probing the system. This excerpt from [a real
Turing test, on the 'Eugene Goostman'
bot](https://www.coventry.ac.uk/primary-news/turing-test-transcripts-reveal-how-chatbot-eugene-duped-the-judges/),
shows this in action. 

[^Watt]: I've argued elsewhere that most of the really interesting stuff in the 
    Turing test is what's going on in the minds of the assessors. I stand by
    that, even today.

> JUDGE: what is your gender    
> EUGENE: I’m a young boy, if you care to know. And not very ugly, by the way!    
> JUDGE: what are you aware of at this moment    
> EUGENE: I would rather not talk about it if you don’t mind. Could you tell me what are you? I mean your profession.    
> JUDGE: how old are you    
> EUGENE: I’m a little boy 13 years old.    
> JUDGE: what are your qualifications    
> EUGENE: My qualifications? I’m not gonna tell you. Oooh. Anything else?    

So, a call to the community: please, in future, when we talk about Turing tests
for real systems, let's think about the test as an experimental format for probing
what might be going on inside the system, trying to build theories and understanding
of them, and even making human judgements about the quality of what they do. Only then
will we be respecting the spirit of Turing's original concept.

## References

[Ashby, W. Ross (1957). *Principles of cybernetics*. London: Chapman & Hall.](http://pespmc1.vub.ac.be/books/IntroCyb.pdf)

[Jones, C. R., & Bergen, B. K. (2024). People cannot distinguish GPT-4 from a human in a Turing test. arXiv preprint arXiv:2405.08007](https://arxiv.org/abs/2405.08007)

[Scarfe, P., Watcham, K., Clarke, A., Roesch, E. (2024) A real-world test of
artificial intelligence infiltration of a university examinations system: A
“Turing Test” case study. *PLoS ONE* *19*(6):
e0305354.](https://doi.org/10.1371/journal.pone.0305354)

[Turing, A. M. (1950). Computing machinery and intelligence. *Mind*, *59*(236), 433–460.](https://archive.org/details/MIND--COMPUTING-MACHINERY-AND-INTELLIGENCE)

[Watt, S. N. (1996). Naive psychology and the inverted Turing test. *Psycoloquy*, *7*(14)](https://www.cogsci.ecs.soton.ac.uk/cgi/psyc/newpsy?7.14)

## Image acknowledgement

[Image of TankPetrol's mural of Alan Turing, photo by Dunk, used under Creative
Commons License: Attribution 2.0 Generic (CC BY
2.0)](https://www.flickr.com/photos/dullhunk/48349530722)
