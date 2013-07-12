---
title: "Using the Revealing Module Pattern"
published: true
author: bob
date: 2012-08-27
category: Application Architecture
tags:
---

The first well-architected JavaScript application I worked on used what is commonly called the Revealing Module Pattern. I've used this pattern on projects ranging from 100 to 100,000 lines of code. I think I've found its breaking points, but also its sweet spots.

<span class="more"></span>

If you're unfamiliar with the revealing module pattern, you can find it discussed in a few different places, but Addy Osmani does a pretty good job of giving it a quick overview in his *[Learning JavaScript Design Patterns](http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript)* book.

If you don't like following links, here's a super-quick rundown:

```javascript
(function(){

  "use strict";

  var MYAPP = window.MYAPP = window.MYAPP || {};

  MYAPP.common = {

    commonVariable: '',

    commonMethod: function(){ /* ... */ }

  }

  MYAPP.module = function(){

    var moduleVariable = '';

    var privateFunction = function(){ /* ... */ };

    var init = function(){ /* ... */ };

    return {

      init: init

    }

  };

}());
```

<small>Edit: Updated line 5. Thanks to Jay Martin, who pointed out I wasn't exposing MYAPP back to the global namespace if I originally created it within the functional scope (if it fell back to a new object).</small>

The revealing module pattern creates an application made up of modules which expose an interface that an application-level controller can call. I prefer to use&nbsp;Paul Irish's [DOM-based Routing](http://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/), which gives us a nice way to kick off our scripts without loading up a complex routing solution. I leave `MYAPP.common` as a plain object (no closure) because I expect to use everything in there from anywhere in my application.

For better code organization, you can break these modules up into multiple files (just remember to minify and concatenate in production). If you find yourself needing to add something other than 'init' into your modules' return objects, it's a good sign you should pull it out into your common object or some other shared object.

### Use Cases for the Revealing Module Pattern ###

A little warning: we're using this only for our single-use sites or applications—not public APIs or any kind of shared code base. We don't pretend that the 'privacy' granted by the closure is anything more than a convenient illusion. Check out [James Coglan's interesting post](http://blog.jcoglan.com/2012/01/19/the-cost-of-privacy/) arguing against relying on privacy in the module pattern.

So why do we use it? In the days before AMD/[RequireJS[(http://requirejs.org/)/[CommonJS](http://www.commonjs.org/), this was a pretty good way of organizing and modularizing your code. These days, I'm much more likely to use RequireJS along with [Backbone.js](http://backbonejs.org/) to do the same thing on a grander scale. But does it still have its place?

In particular use cases, I think it certainly does. If a project shared more than one of these characteristics, I'd consider it a good candidate for this pattern:

#### A small to mid-size site, somewhere in the 5-10 (give or take) page range ####

When paired with the DOM-based Routing solution above, it's pretty convenient to assign each page of a site to a module. A site of this size makes something like RequireJS often seem like overkill. The common object should carry common things like main navigation and footer functionality.

#### A site with minimal functionality&mdash;perhaps the progressive enhancement approach ####

Even when modularizing like this, it's easy to get lost if a module goes over a couple of hundred lines. Something smaller is easier to keep track of. Maybe you're just adding fancy hover states or doing some DOM manipulation. This pattern is a good way to get on the road to extracting useful functions instead of passing anonymous callbacks all over your application.

#### A site that shares much of the functionality it does have all throughout ####

For example, I've seen this pattern used with great success on a site of probably 15-20 pages where we were calling the same functionality ([jQuery Masonry](http://isotope.metafizzy.co/) and a custom collapsible sidebar) on nearly every page, but with a different configuration on each page. In this case, all the site's functionality was in the common object, and each page/module's initialization function only needed to pass its own specific options into a common page initialization method. In this case, each module was no more than 10 lines, but gave us a great deal of control over how each page was laid out and initialized.

#### A site that shares almost none of its functionality ####

Sure this seems to contradict the earlier statement. The thing is, this pattern seems to work well on both sides of this seeming dichotomy (it's the middle of the road that'll get you here). This is just the inverse of the earlier statement, where instead of loading up your common object with shared functionality, each page of the site/app has completely different functionality. So different in fact, that you will re-use almost none of the code. You tend to see sites like this a lot in my line of work (digital marketing), where a microsite might have a homepage carousel, a 2nd page quiz and a 3rd page contact form with no common thread holding them together.

### Summary ###

Hopefully this has been a coherent overview of the revealing module pattern and when you might want to use it. I probably haven't started a project with this in the last 4-6 months, instead opting to start using Backbone.js and RequireJS for my code organization/modularization. However, if the right project came along again, I might consider it. I also much prefer that the other developers I work with (some of whom may or may not be ready or willing to jump into AMD just yet) to use this pattern on the projects they take the lead on and not to throw a thousand lines of chained jQuery and anonymous functions into a single file and push it live.