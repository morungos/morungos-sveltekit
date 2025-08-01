---
layout: page
title: 'Hank: a visual modelling language'
background: '/img/bg-about.jpg'
---

## Cognitive modelling

Cognitive modelling was an important part of the psychology curriculum, when I
worked at the UK's Open University. When I started there, cognitive modelling
was taught using Prolog, but this was less than ideal. It meant that psychology
students ended enduring a two day intensive programming event, rather than
understanding what models could do in psychology. 

A colleague, Paul Mulholland, and myself, got to chatting about these issues --
Paul's PhD was in how learners think about Prolog, and mine was on common-sense
psychology. We ended up putting the two together, and cooking up an entirely new
way to think about modelling, by designing the language alongside a narrative
based on
[*syntonicity*](https://www.tech.dmu.ac.uk/~mjdean/notes/modules/education/EDUC2323/syntonicity2.pdf),
a concept introduced by Seymour Papert in Logo. This involved planning the
language to make it easier to identify with, to take the perspective of the
language itself.

We also watched how students drew pictures, before they even started building
their models, and we noticed that they used two common notations: flow charts
and tables. With a considerable amount of iteration, we ended up with a 
clean and consistent visual language, consisting of 'fact cards' that showed
data a little like a relational database, and 'instruction cards' that set out
the steps followed by a process. The result looked a little like this:

<figure class="figure">
  <enhanced:img src="$lib/assets/pages/hank-1.png" 
       alt="Screen display of a relatively complex model in Hank">
    <figcaption class="figure-caption">
    Screen display of a relatively complex model in Hank, for the Towers of
    Hanoi. 
    </figcaption>
</figure>

## Implementation

We implemented the language and environment in Common Lisp for Windows, using
the same Lisp we'd used with [Syllabus](/stories/syllabus/). 

The core of the interpreter was built using a state-based interpreter -- much
the same approach as
[Froglet](https://kmi.open.ac.uk/publications/techreport/kmi-94-01), a
source-level stepper for Common Lisp. This had one significant feature: 
the ability to run a program backwards for a small number of steps. 

## The impact of Hank

Hank was a central piece of the Open University's *Cognitive Psychology* course,
which was taken by around 1500 students each year. This made it one of the most
widely used visual languages in existence at the time. But the software was 
only part of the puzzle -- Paul and I also developed a very substantial new
workbook which introduced cognitive modelling, worked through a few simple
examples on paper, and discussed the method and how it related to other methods
in the field. 

Both we and many other tutors taught cognitive modelling using the new software
and workbook, and we were all surprised how successful the new materials were.
Where, previously, we had almost always ended up getting bogged down on 
questions about how Prolog worked, learners were very quickly able to explore
a range of options, and to connect it to experimental data. 

## References

Mulholland, P., & Watt, S. N. (2000). Learning by building: A visual modelling
language for psychology students. *Journal of Visual Languages and Computing*,
*11*(5).
[https://doi.org/10.1006/jvlc.2000.0178](https://doi.org/10.1006/jvlc.2000.0178)
([*Preprint available here*](https://oro.open.ac.uk/44550/1/learning-by-building-jvlc.pdf))
