---
layout: post
title: Comparison of XLSX modules for Perl
author: Stuart
summary: >-
  Some experiences mapping out which of the many possible Perl 
  modules for Excel are best.
---

Excel is still one of the most common tools in science, so I'm routinely working
with Excel data files, either as an input file or for output.

Today's task was to import data for the [tracker](https://github.com/pughlab/tracker).
There's a small Perl script that reads data from a set of spreadsheets and
merges them into a single data block. I used Perl because Java is boring for
a small and simple task like this, and performance isn't much of an issue for
a command-line import tool.

There are many different modules for reading Excel files, but I'm now only
interested in "modern" `.xlsx` files, which are actually implemented as zip
archives containing XML data. The modules of interest are:

 * [Spreadsheet::XLSX](https://metacpan.org/pod/Spreadsheet::XLSX)
 * [Spreadsheet::XLSX::Reader::LibXML](https://metacpan.org/pod/Spreadsheet::XLSX::Reader::LibXML)
 * [Spreadsheet::ParseXLSX](https://metacpan.org/pod/Spreadsheet::ParseXLSX)

> There is actually a fourth module: [Data::XLSX::Parser](https://metacpan.org/pod/Data::XLSX::Parser)
> but I wasn't aware of this at the time I did this work.

All have a similar-ish interface, but there are significant differences between
them inside.

 * [Spreadsheet::XLSX](https://metacpan.org/pod/Spreadsheet::XLSX) uses regular
   expressions to parse XML, and definitely leaks XML values into cell data,
   sometimes very badly. It's old, too, and hasn't been updated in about
   five years, but it's widely used.
 * [Spreadsheet::XLSX::Reader::LibXML](https://metacpan.org/pod/Spreadsheet::XLSX::Reader::LibXML)
   uses LibXML to parse the data (which is good and fast), and is nicely architected
   in [Moose](https://metacpan.org/pod/Moose). It also exposes formatting and style
   information, and is far the most revealing about the spreadsheet data.
 * [Spreadsheet::ParseXLSX](https://metacpan.org/pod/Spreadsheet::ParseXLSX)
   uses [XML::Twig](https://metacpan.org/pod/XML::Twig), and is smaller and
   lighter than either of the others, especially in the amount of data it
   exposes.

So my import script was using [Spreadsheet::XLSX](https://metacpan.org/pod/Spreadsheet::XLSX)
and was normally OK, except for its total inability to handle some useful cases
(such as Excel's special values for `#N/A`). This module also does everything
using raw access to hashes, so it's fairly brittle.

I wanted to switch to something more solid, and first I started with
[Spreadsheet::XLSX::Reader::LibXML](https://metacpan.org/pod/Spreadsheet::XLSX::Reader::LibXML)
(I'm a long-time user of LibXML) but it very quickly proved extremely slow. It's actually
still running an import I started three hours ago, and it's still on one spreadsheet.
This import took about three minutes with
[Spreadsheet::XLSX](https://metacpan.org/pod/Spreadsheet::XLSX).

Turning to [Spreadsheet::ParseXLSX](https://metacpan.org/pod/Spreadsheet::ParseXLSX)
I then found that it broke immediately on my data files. There is an outstanding
issue on this (see: https://github.com/doy/spreadsheet-parsexlsx/issues/38) and I was
mid-way through building a test case to help when the error went away -- I noticed --
when I removed a chart.

Thanks to Github, I could fork, build a test case and a pull request, and it's now
waiting to be merged. By far the longest step was installing all the [Dist::Zilla](https://metacpan.org/pod/Dist::Zilla)
plugins. In the meantime, I can manually delete the charts.

So for now, the choice seems to be dependent on the task:

  * Use [Spreadsheet::XLSX](https://metacpan.org/pod/Spreadsheet::XLSX) if like
    punishing yourself for using regexes to parse XML
  * Use [Spreadsheet::XLSX::Reader::LibXML](https://metacpan.org/pod/Spreadsheet::XLSX::Reader::LibXML)
    if you need complete access to the Excel representations, and your files aren't that
    big, or you have plenty of runtime capacity
  * Use [Spreadsheet::ParseXLSX](https://metacpan.org/pod/Spreadsheet::ParseXLSX) for quick
    access to the underlying data of an XLSX spreadsheet.
