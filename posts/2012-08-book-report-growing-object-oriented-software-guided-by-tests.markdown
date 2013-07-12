---
title: "Book Report: Growing Object-Oriented Software Guided by Tests"
published: true
author: bob
date: 2012-08-30
category: Book Reports, Testing
tags:
---

<a href="http://www.amazon.com/gp/product/0321503627/ref=as_li_tf_il?ie=UTF8&amp;camp=1789&amp;creative=9325&amp;creativeASIN=0321503627&amp;linkCode=as2&amp;tag=bobseclectibo-20" style="display:inline!important"><img class="alignright" style="border: 0px;" title="Buy Growing Object-Oriented Software Guided by Tests on Amazon" src="http://ws.assoc-amazon.com/widgets/q?_encoding=UTF8&amp;ASIN=0321503627&amp;Format=_SL160_&amp;ID=AsinImage&amp;MarketPlace=US&amp;ServiceVersion=20070822&amp;WS=1&amp;tag=bobseclectibo-20" alt="Buy Growing Object-Oriented Software Guided by Tests on Amazon" width="120" height="160" border="0" /></a><img style="border: none !important; margin: 0px !important;" src="http://www.assoc-amazon.com/e/ir?t=bobseclectibo-20&amp;l=as2&amp;o=1&amp;a=0321503627" alt="" width="1" height="1" border="0" />I just finished reading&nbsp;<a href="http://www.amazon.com/gp/product/0321503627/ref=as_li_tf_tl?ie=UTF8&amp;camp=1789&amp;creative=9325&amp;creativeASIN=0321503627&amp;linkCode=as2&amp;tag=bobseclectibo-20"><em>Growing Object-Oriented Software, Guided by Tests</em></a><img style="border: none !important; margin: 0px !important;" src="http://www.assoc-amazon.com/e/ir?t=bobseclectibo-20&amp;l=as2&amp;o=1&amp;a=0321503627" alt="" width="1" height="1" border="0" /> by [Steve Freeman](http://www.higherorderlogic.com/) and [Nat Pryce](http://www.natpryce.com/). [Brandon Keepers](http://opensoul.org/) recommended this book in his talk ["The Plight of Pinocchio: JavaScript's quest to become a real language"](http://opensoul.org/blog/archives/2012/05/16/the-plight-of-pinocchio/) at [BackboneConf](http://backboneconf.com/) in June. It's a pretty good start for thinking about Test Driven Development and application design.

<span class="more"></span>

### The Good Stuff ###

The book does a great job of explaining good application design: separation of concerns, encapsulation, and modular design connected through messaging. Some of the points raised here immediately struck a chord with me. Inspired by this book, I've done some refactoring of my current project over the last couple of days, which resulted in a more stable application (in my opinion) and removed about 2,000 lines of code.

The book also hits on some of the good conceptual stuff to keep in mind when developing tests. I'm definitely inspired to implement testing in my current and future projects. I've played with [QUnit](http://qunitjs.com/) before, and I'm going to give [Jasmine](http://pivotal.github.com/jasmine/) a shot.

### The Lesser Stuff ###

My biggest complaint—though your mileage may vary—was that this was far more reliant on Java syntax than advertised. I was expecting a far more conceptual book. About half the book is a step-by-step walk-through of developing an application using Test Driven Development. I was able to pick out a lot of the concepts, but the examples were heavily dependent on reading Java and understanding how the Java-specific testing suites the authors used worked. To be fair, there is a good overview of the tools used, but as someone who doesn't deal with Java every day, I found myself completely skipping the code examples and scanning for the concepts.

### The Verdict ###

If you're a Java programmer looking to start unit-testing your code, I would say this is a 100% no-doubt must-read. If you're programming any other language, I'd say it's useful to a point, but maybe keep an eye out for a more language-agnostic guide. I know I will.