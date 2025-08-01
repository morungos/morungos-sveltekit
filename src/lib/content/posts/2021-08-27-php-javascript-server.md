---
layout: post
title: A proxy server for developing and debugging PHP apps under FPM
author: Stuart
card: 'angry-cat-laptop.jpg'
card_alt: >
  A cat with dark head and paws, sitting on a open laptop, with its mouth open
  in an angry growling and hissing.
summary: >-
  Running a test server for PHP is not always easy, and there are a few 
  technical hurdles. Here's how I did it.
---

As we work through a number of improvements on [Meet-O-Matic](https://meetomatic.com),
one of the challenges we have faced is testing. (This is despite the many hours of 
effort and support from [Michael Bolton](https://twitter.com/michaelbolton) and 
[James Marcus Bach](https://twitter.com/jamesmarcusbach), who I still cannot 
thank enough.)

PHP application testing is a lot better than it used to be, but we wanted to have a
proper end-to-end test setup, so we could model a user running through normal behaviour
and apply some checks. 

We aren't doing this because we are strict at testing, but when modernizing an 
application, it has been our experience that having something like 
[Puppeteer](https://github.com/puppeteer/puppeteer) can be extremely useful, as it 
provides a relatively fast check for developers that nothing too bad is broken.
For example, we're porting a lot of what we used to do through scripts into a RESTful
API, so the way error checking, redirects, and even sessions are used changes 
quite often, and it's good to have a rough indication of where the problems arise
when we do this. 

The handiness here comes mainly from the way we can run this often from the 
command line, so we can pick up code as we break it and fix it quickly and often,
rather than making a large block of changes and then doing a manual scan for issues.
I mean, we do all that too, but it is infinitely easier when we at least exercise
the majority of the code and fix all the missing variables and superficially broken
logic as soon as we can, so our manual scans get to the core problems quicker. 
In Don Norman's terms, we're closing the [gulf of evaluation](https://www.interaction-design.org/literature/book/the-glossary-of-human-computer-interaction/gulf-of-evaluation-and-gulf-of-execution).

So, we actually aren't doing this to check that the system works, we're using it
to flush out as many error messages as we can in a short space of time, so we can
address them in context.

The issues with PHP are that to do this kind of test, we want a quick command-line server 
(so we can run it as developers, without having to deploy all the time) that
is more or less an accurate model of what's going to be around in production.
PHP being PHP, there are several options people use, but two common approaches:

1. You can run the [`php`](https://www.php.net/manual/en/features.commandline.webserver.php) 
   command as a standalone server, e.g.:
```
    $ php -S 0.0.0.0:4000 -t $(pwd)/directory
```

2. You can run [`php-fpm`](https://www.php.net/manual/en/install.fpm.php) through 
   a proxy such as `nginx`, e.g.:
```
    $ php-fpm -d fpm.config=$(pwd)/config.conf
```

So it turns out that the request environment for these can be quite different, in
unusual and subtle ways. The standalone `php` server is single-threaded, so there's 
never a problem with requests happening at the same time. The standalone `php` server
will also conveniently serve static files, which `php-fpm` never does, but it can't do
redirects for `/`, for example. Also, while environment
variables typically do show in the requests for `php`, the `$_SERVER` variable contains
some very different data. So, if you test using `php` and deploy using `php-fpm`, there are 
some significant risks that your application will break in production. In other
words, it's okay for actual development, but not to be trusted flushing out bugs
when you modernize.

We wanted, therefore, a way to run `php-fpm` requests in a way that we could
run something like [Puppeteer](https://github.com/puppeteer/puppeteer), which 
means allowing static files, serving from a single origin, and having effective
logging to a console. 

But we don't want to have to run `nginx` and deploy that way. We want a way to
use `yarn` to run both our own JavaScript proxy and `php-fpm` at the same time. 
In effect, we use a JavaScript script to assemble a more powerful standalone
server that wraps around `php-fpm`, and that is much more consistent with the way
we run in production. 

Our server script, [which is on Github as a gist](https://gist.github.com/morungos/f468e00dfb20d63f6ea9300fdc92df43), lets you do just
that. It serves files from a given directory, but also hands anything ending `.php`
to a `php-fpm` process. And with [`jest-puppeteer`](https://jestjs.io/docs/puppeteer) 
it provides a very clean and simple way of spinning up a proxy so you can test 
against `php-fpm` rather than the standalone server.

It isn't perfect: logging messages do not have a clear end delimiter sent 
through `php-fpm` -- in production that isn't an issue as we use `rsyslogd`, but
in development we do the best we can to separate and log the lines, and it is 
good enough.

But, there was a delightful issue.

We've been using this test platform for a few months, without apparent problems, 
right up to yesterday, when it was broken when we started working on the export
parts of the application.

One of the features of Meet-O-Matic is that it allows you to download a spreadsheet
of meeting times. This used to be generated as XML, but now we use an improved module
that generates modern Open Office (.xslx) files. These files are not text: they're
actually a specially-constructed zip file. (I know all about the subtle issues of
these files, having fairly recently updated 
[my Word extraction module](https://morungos.com/2021/05/17/word-extractor/) to handle 
the equivalent for Word files, and these are basically the same -- you can unzip
these files to see the magic contents inside.)

Okay, so now, what used to download as a text file now downloads as binary, and 
we were starting to test this new endpoint when suddenly all the spreadsheet data
files were garbage on download.

And it's debugging time.

Poking around in the downloaded file, we used an octal dump, and find data 
that looks like this:

```
% od -t x1 output.xlsx | head
0000000    50  4b  03  04  14  00  00  00  08  00  ef  bf  bd  ef  bf  bd
0000020    1b  53  47  ef  bf  bd  44  ef  bf  bd  5a  01  00  00  ef  bf
0000040    bd  04  00  00  13  00  00  00  5b  43  6f  6e  74  65  6e  74
0000060    5f  54  79  70  65  73  5d  2e  78  6d  6c  ef  bf  bd  ef  bf
0000100    bd  ef  bf  bd  4e  ef  bf  bd  30  10  45  ef  bf  bd  7c  45
0000120    ef  bf  bd  2d  4a  ef  bf  bd  ef  bf  bd  40  08  35  ef  bf
0000140    bd  ef  bf  bd  12  2a  51  3e  60  ef  bf  bd  27  ef  bf  bd
0000160    55  c7  b6  6c  ef  bf  bd  ef  bf  bd  ef  bf  bd  4c  ef  bf
0000200    bd  ef  bf  bd  ef  bf  bd  ef  bf  bd  40  ef  bf  bd  6e  62
0000220    45  ef  bf  bd  67  72  3d  ef  bf  bd  ef  bf  bd  74  57  ef
```

Note all the occurrences of `ef  bf  bd` -- that's what Unicode does when it can't
handle a character. So essentially, we know that the spreadsheet data is
being handled (incorrectly) as if it is text. 

(Side note: I have spent rather more hours on Unicode translation issues than I
care to admit. As we will see, this is made worse by every single language or
environment handling Unicode slightly differently.)

So we now have a working hypothesis: we change the code to write `XXXX\xff` as
a string, and again we see the issue. What is sent as `XXXX\xff` (and is five octets)
arrives as: `58  58  58  58  ef  bf  bd` (which is seven octets). And it doesn't 
matter if you change the `\xff` to anything non-ASCII, you can use `\x80` and still
get the exact same: `58  58  58  58  ef  bf  bd`. 

What was odd (and in retrospect, the tell that this was a proxying problem), 
using the Slim framework for PHP, we could confirm that the written
body size was 5 octets, so we knew that what we were sending out of PHP is correct, 
but that what arrived in the client was 7 octets. In fact, every single character
that is `\x80` or above gets translated into three octets `ef  bf  bd`, which is
why the downloaded file is so much bigger than the sent data.

For me, as a former Perl coder, this was not a total shock. Perl has a "UTF-8 flag"
for a string, which marks whether the same array of octets is UTF-8 or binary 
data. So I was fully expecting there to be some kind of a flag that we needed to
set somewhere. It could even be some mode that we need to attach to a stream. 
There are a lot of places in application frameworks that attempt to do the right
thing with text. After a few hours of reading and frustration, I eventually 
realized that I was over-estimating PHP, which is mostly too primitive to have
any of that going on. 

This had me writing a multi-page bug/question to the Slim framework folks when
I finally twigged that our test system was *not transparent* -- there was
a proxy between `php-fpm` and the client, and even worse: 
*it was a proxy that I had written*, so there was a more-than-usually-high 
probability of it all being an issue at my end. 

In other words, my own test tool had been so perfectly transparent (up to now) that I had 
completely forgotten that it even existed, and yet, it was the fault all along.

Anyway, it turns out that the character encoding problem was in 
the proxying between the PHP client
(which connects to the separate `php-fpm` process) and the 
`ExpressJS` server. The requesting part worked fine: the problem was that, to generate
the ExpressJS response, we need to identify the request status and headers, and the
way my initial script worked, we simply translated data to UTF-8.

And because we don't even know where the headers end yet (a HTTP response starts with
ASCII headers, followed by CRLF-CRLF, followed by the body, which could use binary 
encoding), we should not attempt to translate the body of the response at all. We should
look in the raw *buffer* for CRLF-CRLF (not in a decoded string), and only then translate 
the headers to ASCII, but pass through everything after CRLF-CRLF in the same exact form, 
i.e., without ever decoding them from the buffer at all.

So, JavaScript does echo the Perl difference between byte arrays and strings, and
is (in my view) much clearer than either Perl or PHP: buffers correspond more or 
less to non-UTF-8 strings, and actual strings in JS correspond to Perl strings 
with the UTF-8 flag set. PHP has no such distinction -- in the core language anyway.

As soon as I adapted the script to include that logic, the downloads were passing
through just fine, and we got workable spreadsheet files through the download.

We learned a lot on this issue:

* Unicode and encoding problems are still a significant problem for 
  application developers.

* PHP's character encodings suck. [When you look into the documentation](https://www.php.net/manual/en/language.types.string.php#language.types.string.details), it's 
  pretty much: "PHP does nothing, you're on your own, good luck".

* Being able to read hex dumps is still a useful skill even in 2021. 
  I wish it wasn't, but there you go.

* Being able to run a Puppeteer-style end-to-end test is fabulous when you are
  progressively modernizing an application, because it can catch user-facing
  issues more or less as they happen. But...

* When your testing framework is so good that you forget it exists, 
  it can still kick you in the ass when you aren't looking.

And finally, if anyone wants a help test framework for a PHP application running under 
`php-fpm`, [our gist script](https://gist.github.com/morungos/f468e00dfb20d63f6ea9300fdc92df43)
may be a good start. I personally find it works pretty well with Puppeteer and Jest, 
but it may become more than that -- we are considering porting the whole application
to JavaScript, piece by piece, and this ExpressJS wrapper will let us move code from
PHP to ExpressJS gradually, and in a way we can incrementally test while still 
consistent with our production deployment.