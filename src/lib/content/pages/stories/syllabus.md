---
layout: page
title: Syllabus
card: 'bg-about.jpg'
---

Syllabus was an early use of artificial intelligence to solve a hard 
problem: how to build a good timetable for a school or a university. 

The problem was a hard one: you had teachers with subject expertise, a set
number of rooms, and you needed to make sure that everyone took the classes they
needed to without anyone having to be in two places at once. Also, a good
timetable meant trying to avoid having the same class twice in a day -- or if
you did, keep it as a block, but not too long a block for people to get bored.
So you have this fascinating mix of physical constraints and preferences. Done
manually, creating a timetable would often take weeks, and was a big distraction
from the day to day management of a school. Hence, there was a great opportunity
for automation.

We were a small team -- four or five people, and we had inherited a proof of
concept system that ran on a Lisp Machine. But this was around 1990, and at that
tine a Lisp Machine cost around $50,000, so the business model was targeting
school districts, so that it would be affordable. 

But when you spoke to a school -- after all, they were the ones who were at the
sharp end of the problem -- they really didn't want the school district having
access to their data. Also, the proof of concept looked okay, but it didn't
really work. We needed a better way forward.

---

## Development

To enable parallel development, we quickly assembled a mock scheduling engine
with a very clear API. This meant that part of the team could develop the 
real engine, while the rest developed a user interface. 

All development was done using Common Lisp. Initially, we dabbled in using the
Macintosh interface through API calls on a Texas Instruments microExplorer -- a
Lisp Machine add-in card for a Macintosh. But as soon as we found the business
model had to change, and we needed to get the software into the hands of schools
themselves, we switched to Procyon Common Lisp. It wasn't as fast at heavy
computation, but it was plenty fast enough on a basic 68000-based Macintosh
without any fancy hardware. Procyon also let us package without a compiler for a
small disk bundle -- and we used quite a bit of C code to do some fancy
Macintosh-specific API code for printing, for example. Allowing the school to
print nice timetables was a huge advantage.

Our competitors -- especially IBM, who were the market leader at the time --
were very curious about how our technology worked, but it wasn't rocket science.
We simply applied state of the art constraint satisfaction technology, with a
few bells and whistles. We did develop some interesting acceleration techniques
within Common Lisp, especially using bit vectors and arrays. We even cooked up
some intriguing approaches to using GPUs to accelerate constraint algorithms.
Considering this was 1991 or so, this was fascinating.

Common Lisp did raise some questions. We did occasionally have to field managers
who were being teased by hype surrounding C++ at the time. But it worked: it was
a native compiler, and to compete as a start-up (which we were) development time
is far and away your most valuable resource. Common Lisp was, we found, between
four and ten times faster to develop than anything else. And besides: because
the final application looked exactly like any other Macintosh program, no
customers cared what it was written in so long as it did what they needed.

---

## Towards a product

Selling software in the 1990s was different. Any software package at that 
time needed to consist of a box, a few floppy disks, and a decent printed
manual. The software had to be relatively simple to install -- many of 
our customers were unfamiliar with technology, I vividly remember trying
to explain to one customer how to use a mouse to move files around, all
over a phone call without being able to see the screen.

<figure class="figure">
  <enhanced:img src="$lib/assets/pages/syllabus-1.png" 
       alt="Screen display of very early Syllabus timetabling screen">
    <figcaption class="figure-caption">
    Screen display of very early Syllabus timetabling screen. Note that
    the first implementation was designed to run on an Apple Macintosh 
    with a nine inch monochrome display
    </figcaption>
</figure>


We put a lot of effort into creating an easy-to-use manual -- the early
Apple Macintosh manuals were a work of art in technical writing, and it 
was a high standard to aspire to. But the software alone would never have sufficed -- to truly address
the challenges of making a timetable for a school, we needed to make it so 
that a teacher who was not an expert with technology would be able to go
from a mailed parcel through installing, entering their data, building and 
printing their timetable with as little frustration as possible. 

Within about eighteen months, the company was breaking even on school
timetabling alone -- and it still exists today as one of the market leaders in
higher timetabling.

---

## A brief aside: my worst ever debugging experience

During the development of Syllabus, I had my worst ever debugging experience.
It's an interesting story, so [it deserves to be told in full.](/stories/worst-debugging)

---

## Read more

My colleague Rick Evertz wrote [this nice article for
IAAI'91](https://cdn.aaai.org/IAAI/1991/IAAI91-004.pdf) about the problems of
timetabling and the Syllabus solution. 

> Evertsz, R. (1991). The development of SYLLABUS -- an interactive,
> constraint-based scheduler for schools and colleges. In the proceedings of the
> 3rd conference on Innovative Applications of Artificial Intelligence, IAAI'91
> (pp. 39-51).
> ([*Full text available here*](https://cdn.aaai.org/IAAI/1991/IAAI91-004.pdf))
