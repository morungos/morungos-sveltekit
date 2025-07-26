---
layout: post
title: Outlook add-ins on the Mac
author: Stuart
## background: '/img/posts/01.jpg'
summary: >-
  Actually running an add-in for Outlook on a Mac is no small challenge
---

One of our projects at [Turalt](https://turalt.com) involves an add-in component for Outlook, 
and we're moving towards the newer [Office add-in framework](https://docs.microsoft.com/en-us/office/dev/add-ins/overview/office-add-ins), 
which is essentially cloud-based and JavaScript, and away from VSTO/C#.

A recent challenge has been simply getting this to work at all on Outlook 2016 for Mac. There are a 
few constraints:

 * You need to use the Store button to "side-load" the add-in manifest file to make it show up
 * The Store button only shows when you have selected a Microsft-hosted email account
 * Sorry, folks: if you're using an IMAP account, no add-ins, ever
 * Newer versions of Outlook 2016 for Mac, the Store button might not show anyway

In the end, I downgraded to version 16.12 of Outlook 2016 for Mac, as versions 16.15 and 16.16 both
seemed to be somewhat flaky. Sometimes the button would appear after a few hours, but often not 
even then. As soon as I switched back to version 16.12, the whole process became instant. 

Microsoft support did confirm there was an issue in recent builds, but didn't know precisely 
when the fix would hit the public release stream.
