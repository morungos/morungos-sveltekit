---
layout: page
title: 'Heliotrope and cBioPortal'
subtitle: 'Translational bioinformatics in clinical research'
card: 'bg-about.jpg'
card_alt: >
  Sun reflecting off a distant coastline, showing bands of bright light 
  against a dark shore.
---

One field I particularly enjoyed working in was translational bioinformatics. I
ended up in this field almost by accident -- I had been working for a small
company offering application portfolio management. That involved taking an
entire organization's code base, parsing it, linking it, and creating a
searchable web site that helped developers trace connections as a management
tool. The process typically involved hundreds of millions of lines of code, in
maybe thirty or so different languages -- analyzing that code to assist
decision-making requires serious custom logic for extracting,
transforming, and loading the data, before it can be displayed.

Bioinformatics, particularly in clinical oncology, has many of the same
challenges. There are many different datasets involved, ranging from
[COSMIC](https://cancer.sanger.ac.uk/cosmic) (a database of mutations in
cancer), through [PubMed](https://pubmed.ncbi.nlm.nih.gov),
[PharmGKB](https://www.pharmgkb.org), as well as local data that cannot be
shared within each clinical research organization. Even more interestingly,
linking these to help decision-making is *hard*. COSMIC might name genes
differently from PubMed, and while there are standard namings for most genomic
variants, not everybody uses them correctly, or even at all. 

During this time I worked on two applications which both broadly aimed to give
clinicians the information they needed.

The workflow was typically like this. If a patient is sadly diagnosed with a
form of cancer, samples of their tumour and of their blood are taken. Both were
put into genome sequencers, which essentially broke the DNA into short pieces
(sequencers can only read a few hundred bases in a go). Each of these gets
turned into a string of As, Cs, Gs, and Ts. This gets put into an *aligner*
which uses matching to work out how these would match up to a reference for a
typical human. Of course, this is a bit fuzzy, we all have inherited differences
which make us the unique people we are. And then, the sample from the blood
comes into play: we subtract out the differences in the blood, so all we are
left with us what's known as *somatic* mutations -- where there's something like
a mutation in the tumour which is not there in the rest of the body. Those are
the real point of interest, because some of these suggest what part of a cell's
machinery have gone awry, and, therefore, what kind of treatment might be best.

So far, so good. Many hospitals do something like this -- they might use
different technology (for example, some variants are relatively common, so
sometimes there are cheaper ways to detect them than sequencing everything).

But at the end of all this, we end up a list of variants in a particular tumour.
For example, of the common ones is G12D in the KRAS gene, i.e., that a protein
is misformed by substituting aspartic acid for glycine at position 12 in the
protein sequence. This changes the behaviour of the protein in a way that makes
cells proliferate. KRAS G12D is easy, though, because it is so well known -- the
challenge is what information to help clinicians for the millions of unknown
variants in the other 20,000 or so human genes. 

For the first project, I inherited an application built using Groovy and Grails.
This was not spectacularly easy, especially for deployment -- Java applications
are so good (a little too good, if you ask me) at separating concerns that
handling authentication and authorization, etc., can often be so distinct from
the application as to make some easy tasks much harder than they need to be.
([*Read more about this application here*](https://www.sciencedirect.com/science/article/pii/S0888754313000700))

<figure class="figure">
  <enhanced:img src="$lib/assets/pages/gen-004.png" 
       alt="Screen display of the Grails-based tracker">
    <figcaption class="figure-caption">
    Screen display of the Grails application for tracking samples in the
    IMPACT study. Note the tabs at the top show that the application integrates
    clinical data (from patients), laboratory-based data (samples), and a 
    knowledge base curated from PubMed.
    </figcaption>
</figure>

## Heliotrope

To lay the foundations for a better solution, we begin development of a better
platform for curating the data. In the old Grails application, all curation for
the knowledge based was 100% manual, done by a team of professional clinical 
analysts.

Heliotrope was designed to help this to scale more effectively. In effect, it
was designed to provide translational clinical genomics -- i.e., it was intended
to automatically curate some of the information that clinicians would want to
make decisions. That did include many of the research databases, but the intent
was to improve integration with clinical research, and particularly PubMed.
Curation and expert support remain key, but we try to offload the tedium of
expecting people to look up databases, and focus on higher-levels of
recommendations. Technically, we dropped Grails, and adopted a new stack, as
follows:

- Front end: JavaScript and AngularJS, with extensive d3 for interactive charting
- Back end: JavaScript and Express
- Database: MongoDB, sharded, with extensive use of pipelines for parallel queries
- Data extraction, translation, loading: some Perl, some JavaScript, extensive SQLite for extraction

<figure class="figure">
  <enhanced:img src="$lib/assets/pages/heliotrope-2.png" 
       alt="Screen display of Heliotrope">
    <figcaption class="figure-caption">
    Screen display of Heliotrope, looking at one particular mutation in the gene EGFR.
    Note that we also use prediction algorithms, like SIFT and PolyPhen. Even though
    these cannot be relied upon clinically, they are a useful starting point for an
    expert clinician to explore.
    </figcaption>
</figure>

Heliotrope also added better reporting, especially using graphical displays
within reports.

<figure class="figure">
  <enhanced:img src="$lib/assets/pages/heliotrope-3.png" style="border: 1px solid black"
       alt="Screen display of Heliotrope">
    <figcaption class="figure-caption">
    One page of a report generated Heliotrope, looking at the same mutation in the gene EGFR.
    Note that the report does not include SIFT and PolyPhen, but it does map which part 
    of the gene this mutation affects, and also, the distribution of other variants in the 
    same gene. All of this does provide important context for clinicians.
    </figcaption>
</figure>


## cBioPortal

cBioPortal is a Java and web application, originally developed at at [Memorial
Sloan Kettering Cancer Center](https://www.mskcc.org/). The application is
designed to make sense of the wealth of research data available in the field. It
provides a lot, and I mean *a lot*, of different data visualizations to help
researchers understand the possible clinical impacts of different genomic
changes.

<figure class="figure">
  <enhanced:img src="$lib/assets/pages/cbio-006.png"
       alt="Screen display of cBioPortal">
    <figcaption class="figure-caption">
    One display for cBioPortal, focusing on data from TCGA (The Cancer Genome Atlas).
    cBioPortal is much more of an analytic tool -- it allows deep dives into 
    very specific questions, such as the impact of mutations in particular types
    of cancer. It is slightly more focused on researchers than clinicians, although
    research clinicians use it extensively.
    </figcaption>
</figure>

I was for some time involved in cBioPortal, as it was stabilizing its code. We
had quite a big to-do list, trying to find a way to nudge the application into a
better architecture without redeveloping the whole thing, which nobody wanted.
Some of the bigger issues included:

- Data access involved a lot of direct SQL string manipulation, and risked query
  injection attacks
- Much of the code used singletons, which limited testing and mocking, and made
- Front end code was written in plain JavaScript embedded across multiple JSPs
  and includes, so JavaScript errors were fairly common and challenging to fix
- JSPs themselves were an issue -- there was some use of RESTful APIs, but,
  for example, charts would sometimes render directly into JavaScript arrays,
  and sometimes used a separate query endpoint.

## Annotated bibliography

An article describing the software we developed to help support the main clinical
trial, and discussing the issues around knowledge curation.

> Watt, S. N., Jiao, W., Brown, A. M. K., Petrocelli, T., Tran, B., Zhang, T.,
> McPherson, J. D., Kamel-Reid, S., Bedard, P. L., Onetto, N., Hudson, T. J.,
> Dancey, J., Siu, L. L., Stein, L., & Ferretti, V. (2013). Clinical genomic
> information management software linking cancer genome sequence and clinical
> decisions. Genomics, 102(3), 140–147.
> [https://doi.org/10.1016/j.ygeno.2013.04.007](https://doi.org/10.1016/j.ygeno.2013.04.007)
> ([*Full text available here*](https://www.sciencedirect.com/science/article/pii/S0888754313000700))
