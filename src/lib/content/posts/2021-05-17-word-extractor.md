---
layout: post
title: JavaScript word-extractor package release 1.0
author: Stuart
background: 'emigrant.jpg'
summary: >-
  Announcing a major update to my Node.js module which extracts text
  from Word files. This new version also extracts text from newer "docx"
  format files.
image: '/img/posts/emigrant.jpg'
image_description: "The Emigrant by Armando Barbon, Port of Halifax, Nova Scotia"
excerpt_separator: "<!-- more -->"
---

I've just released version 1.0 of [my JavaScript module for reading text 
from Word files](https://github.com/morungos/node-word-extractor). This has been a long time coming. A lot has changed, and 
a fair number of teeny bugs which nobody had noticed except me have also 
been fixed.

Essentially, with this module, you can point it at a file (or a Node.js Buffer)
and it'll give you an object containing the file body, headers, footers, endnotes
and footnotes, and the annotation comments, without needing to install Word or
anything else. It's fast, too. If you need to process a ton of Word files, this 
is the kind of tool you need. 

The API hasn't changed at all, but because almost the whole of
the internals have been rewritten, it's a major version update so that if
anything is broken, you won't automatically slurp up the new version 
through semantic versioning. 

The major change is the module now supports "Open Office"-style (docx) files
trasparently alongside classic "OLE"-style (doc) files. The differences are
as follows:

* Classic "OLE-based" formats date back to Word '97. These use an OLE 
  compound document to interleave data. Most of the text is in a single stream,
  but style information is organized in parallel, using a fancy set of binary
  data tables to annotate it. This gets pretty complex, for example, a table
  cell terminator is ASCII 7, but a bit set in a parallel style data block 
  is used to specify which cell terminators are actually row terminators. 
  [The data format specification is a fairly cryptic hundred pages or so.](https://docs.microsoft.com/en-us/openspecs/office_file_formats/ms-doc/ccd7b486-7881-484c-a137-51170af7cc22) 

* Modern "Open Office" formats originated in Word 2007 and are more or
  less the default now. These are essentially zip archives containing XML
  data, so they are smaller, and much easier to process. It's also no longer 
  specifically a Microsoft thing, and an ECMA standard. [However, the specification
  is enormous, about 5000 pages of XML-baseed misery, which I skimmed so that you didn't have to.](https://www.ecma-international.org/publications-and-standards/standards/ecma-376/)

Several people had requested support for .docx files, or at least (rightly) 
complained when the same module didn't really explain why it didn't handle 
newer files. And I'd not really had the time to write the code for it until
recently. Anyway, it seemed time to handle the two transparently, even though 
the extraction process is entirely different. 

Also, I felt a bit guilty over the lack of maintenance over this module, 
especially when I pushed at it and found how many things weren't quite right. 
As is usual for coders, things start to happen when guilt beats out inertia. 

There's still room for more work to do, but it's decently well tested. The
main issue for now is that in some files, there are small white-space differences between
the text extracted from an OLE-based and an Open Office-based version of the same
file. The text is identical, but there are some extra newlines I still need to 
puzzle out. And text boxes might also be nice, the module doesn't yet extract
text from them at all. 

If you have any requests or comments, you can find the module on NPM at
[https://www.npmjs.com/package/word-extractor](https://www.npmjs.com/package/word-extractor),
or on Github at: [https://github.com/morungos/node-word-extractor](https://github.com/morungos/node-word-extractor),
and feel free to create an issue there if you have any ideas, or find something that
doesn't work as well as you'd like. I especially like to add breaking cases to 
the test data, so if you can make a tiny Word file that doesn't work, send them my way.
