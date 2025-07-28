---
layout: page
title: My worst debugging experience
background: '/img/bg-about.jpg'
---

## Debugging Syllabus hard disk lock-ups

When it came to deployment for [Syllabus](/stories/syllabus/), we hit a
delightfully hard problem, which in the end was about the hardest bug I've ever
encountered. Syllabus was relatively expensive, and our management was firm that
we needed some form of copy protection. The solution they came up with was a
hardware 'dongle' that plugged into the Macintosh SCSI bus, that connected the
computer and the hard disk. This came with a small chunk of C code that would
confirm that the dongle was present. So, when the application started, we could
run the check and the program would exit if the dongle wasn't connected.

Apart from the challenges of getting C and Lisp connected, most of the time this
worked very well. I say most of the time because, after release, we got reports
from some customers that specific builds of the software would entirely lock up
the whole system on application start. Not every customer was affected, and
sometimes we would just make a new build and the problem would go away. But, it
was a significant and annoying problem for those customers, so we needed to fix
it.

First, the problem was replicating the issue. We knew from early on that the
dongle -- or its software -- was implicated. We'd never encountered the issue
before or without it. But when we raised the issue with the dongle vendor, they
were adamant that the problem was not at their end. 

The second part of the problem was that when we finally did replicate the issue
(remember: only certain customers were affected, and it turned out the only some
dongles caused the problem), it was *very* deep in the system. Basically, the
whole disk locked up. The only way to get out of the situation was a hard
reboot. 

Interestingly, I worked out fairly early on that the issue was not with the 
dongle C code. With a little tracing we found that when the system crashed, it 
it would do so before the dongle code was even called. In fact, even if the
dongle code was not linked in, a bad version of the application would trigger 
the system lock -- if the dongle was connected.

I was the only member of the team with lower-level systems experience, so I ended
up taking my trusty Apple Macintosh SE/30 home for a week, and patiently working 
through the problem in a quiet space. It took about three or four days, much of
which was single-stepping through the disassembled code using 
[MacsBug](https://en.wikipedia.org/wiki/MacsBug). 

The way Procyon Common Lisp worked when making a build was: you'd specify a
start function, and the build code would more or less do a garbage collection,
and remove everything that could never be accessed by your application, as well
as a few other things, like the compiler itself. Then, it pack this, and write
it as a disk image. This disk image would be read by the native Macintosh
executable, which would bootstrap the image and then call the top level
function. So at the end, the customers had two files: a small Macintosh
executable and a somewhat larger disk image that comprised our application, and
was maybe a couple of megabytes in size.

After some tracing, it turned out that the lockup happened when the disk image
itself was being read. With a little more work, we found that as the file was
being read a block at a time through SCSI, when it hit a certain specific disk
block, that was enough to freeze the disk. In fact, even copying the disk image
was enough to luck up the system, *you didn't need to run the application at
all*.

At this point, we knew the issue was not ours, and we were certain that it was
due to the hardware dongle, because without it, nothing went wrong. We had,
through careful tracing, eliminated both our software and the dongle software.

So, the next experiment was to see if we could focus on the disk blocks that
caused lockups. I cut down and made a small file, consisting only of the
troublesome blocks in the disk image -- *and copying these files, too, was
enough to lock up the system*.

When we looked inside these blocks, we noticed a recurrent pattern -- somehow,
sometimes, the images contained 128 repeats of a four byte sequence, and some
sequences were enough to trigger the dongle hardware to lock up the SCSI bus. 

Helpfully, the build process was a tiny bit stochastic. It was interactive, and
if you ran it again, there was no guarantee you'd get exactly the same disk
image. That made sense, after all, the key component to packing was a slightly
fancy garbage collection, and garbage collection can vary depending on where
things happen to fall in memory. So it is entirely possible to run the build
again and get a different disk image which didn't have a troublesome block
inside.

Anyway, at this point we had a solid enough replication that we could go back to
the dongle vendor, and this time, they admitted that yes, it was their fault. It
turned out that some dongles we'd been issued used identifiers that conflicted
with SCSI, and we were given new dongles for the next batch. 

The moral of the story is that sometimes, you might be in the position of having
to debug a vendor's code, and that might even involve very low level hardware
tracing, because it's unlikely that a vendor will admit straight off the bat
that anything is their fault. You may need to get enough of a replication to
shift the burden of proof onto them. 

Although this was my worst experience, I have had quite a few others that were
very nearly as bad. More than a few involved having to debug vendor code at a
lower level than should have been necessary. Yes, ActiveState, I am thinking of
you.