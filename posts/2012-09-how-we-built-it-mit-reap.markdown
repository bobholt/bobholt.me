---
title: "How We Built It: MIT REAP"
published: true
author: bob
date: 2012-09-10
category: Sites
tags:
---

![MIT REAP](/img/2012-09-how-we-built-it-mit-reap/reap.jpg)

[Genuine Interactive](http://www.genuineinteractive.com/) recently built a new site for the [MIT Regional Entrepreneurship Acceleration Program](http://reap.mit.edu/) (MIT REAP). We tried some new libraries and architecture for the first time, so let's take a look.

<span class="more"></span>

### Architecture ###

<img class="alignright size-full wp-image-112" title="MIT REAP JavaScript File Structure" src="/img/2012-09-how-we-built-it-mit-reap/filestructure-e1347411581830.jpg" alt="" style="max-height: 456px; float: right; max-width: 177px;" />The [revealing module pattern](http://www.bobholt.me/2012/08/using-the-revealing-module-pattern/) has been our go-to application pattern for a while. Another recent project used [Backbone.js](http://backbonejs.org/), but with no particular structure. That was a learning experience, but I wasn't sold. Then I attended BackboneConf, and got excited to try it again.

Right before we started front-end development on MIT REAP, Addy Osmani and a crack team of developers revealed [Aura](http://addyosmani.github.com/aura/). Aura implements a modular, distributed, event-driven application architecture of the type advocated by [Addy Osmani](http://addyosmani.com/largescalejavascript/) and [Nicholas Zakas](http://www.slideshare.net/nzakas/scalable-javascript-application-architecture). Aura gave me an opportunity to work with Backbone while letting us try this distributed architecture and giving us a sensible file structure to work with.

Excluding the front page, there's very little JavaScript on this site (some main nav and form flashiness, and some carousels and modals), so it was a good project to try something new. If we ended up needing to rip Aura out and build the site the way we always had, it wouldn't have been that big of a deal, particularly since we already had a basic proof-of-concept for the map libraries (more on those later) built using the good old revealing module pattern.

Once we got started with Aura, going back to the old way never even crossed my mind . I'll likely dig deeper into Aura in a future post, but in short, it provides an easy way of building and wiring together our widgets. Nearly every part of the front page is a separate widget that does what it needs to do and alerts other widgets to user interaction. Fire-and-forget is a fun and easy way to build an application.

…though the really early version of Aura we used didn't let us do this as nicely as we might have hoped. The publish/subscribe functionality in this version was completely intertwined with widget start/stop functionality. Publishing an event caused the application to look for and attempt to start a widget by that name. If a widget didn't exist, it would throw an error. I ended up using [Ben Alman](http://benalman.com/)'s [Tiny PubSub gist](https://gist.github.com/661855) to get the messaging I needed between widgets. I thought maybe I didn't understand how this part of Aura worked, but it turns out that it was a [real issue](https://github.com/addyosmani/aura/issues/23) that Addy has since fixed. I recently updated Aura on another project I'm working on and removed Tiny PubSub.

Some other tweaks I made were part personal preference and part what I believe are real improvements. I replaced [Underscore](http://documentcloud.github.com/underscore/) in the Backbone implementation with [Lo-dash](https://github.com/bestiejs/lodash), which is higher-performing drop-in replacement. I also implemented a version of [Rebecca Murphey](http://rmurphey.com/)'s [SuperView](https://github.com/rmurphey/srchr-demo/blob/master/app/views/base.js), which she showed off at BackboneConf. The SuperView provides several helpful methods for Backbone Views that you always tend to find yourself writing over and over as well as some useful post-render and post-place-at methods. Instead of directly extending the Backbone View object, we extend SuperView and get these awesome methods to use.

The one thing I found lacking in Aura (and is still a bit of a drawback) was its lack of routing support. We wanted to follow a link from the front page map, but then use the back button and return to the same zoom level and focus area. Aura's set up breaks Backbone's built-in routing, which is simple, stable, and powerful, but for a this application, I had no problem using [History.js](https://github.com/balupton/History.js/).

It looks like the direction Aura will go on the [routing issue](https://github.com/addyosmani/aura/issues/93) will be to add it as an optional extension, or more likely, leave it as an exercise for the user to fill in their own routing solution. I'd like to tinker around with Backbone's routing to see if I can create a plugin that will 'fix' the functionality for Aura. Or maybe I'll just stick with History.js.

### The Intro Tour ###

<a href="/img/2012-09-how-we-built-it-mit-reap/tour.jpg"><img class="alignright size-medium wp-image-116" title="MIT REAP Map Tour" src="/img/2012-09-how-we-built-it-mit-reap/tour.jpg" alt="" style="float: right; max-width: 260px; max-height:147px;" /></a>The introductory tour is pretty straightforward. It is essentially a modal that fires events to tell other widgets to highlight themselves by setting their z-index to higher than the translucent overlay. After I put this together, I saw [Joyride](http://www.zurb.com/playground/jquery-joyride-feature-tour-plugin), a jQuery feature tour plugin, mentioned somewhere. It might have saved us a little time, but it was fairly trivial to build our own from scratch.

### The Map ###

<a href="/img/2012-09-how-we-built-it-mit-reap/map.jpg"><img class="alignright size-medium wp-image-120" title="map" src="/img/2012-09-how-we-built-it-mit-reap/map.jpg" alt="" style="float: right; max-width: 260px; max-height: 147px;" /></a>The most functionally interesting front-end feature of the site is the interactive map. This is actually a pretty straightforward implementation of [MapBox](http://mapbox.com/) using the [Leaflet](http://leaflet.cloudmade.com/) and [Wax](http://mapbox.com/wax/) libraries pretty much exactly as the tutorials show you.

The one big exception was the dynamic country dots. These are markers that change in size depending on the number inside (which are also a live-text part of the marker). To do this, I ended up using a modified version of the [workarounds](http://leaflet.uservoice.com/forums/150880-ideas-and-suggestions-for-leaflet/suggestions/2720350-number-the-markers) found on the Leaflet forums.

Lastly, to make the country dots switch out to the granular point icons at higher zooms, I used multiple GeoJSON layers tied to the map's zoom level. Leaflet has built-in events I was able to tie into to change out GeoJSON layers on map zoom.

My only complaint about Leaflet was that in the last week or so of active development, they upgraded from 0.3.x to 0.4. That doesn't sound like a huge jump, but there were some huge breaking changes - especially in GeoJSON layers. Obviously, I didn't want to change out the library that would break my existing site, but the Leaflet team updated all the documentation on the Leaflet site to the 0.4 version. All of the 0.3.x documentation I needed to fix a couple of last-minute bugs was gone. I spent a lot longer than I would have liked tramping through 0.3.x's source code figuring out available options and ways to fix my bugs. There's a link in the [API documentation](http://leaflet.cloudmade.com/reference.html) now for the 0.3 docs, but it's really just a link to the 0.3 source code on github - not nearly as useful as the all-in-one-place API documentation on the Leaflet site.

So library developers, my plea to you is this: If you make breaking changes in your library, leave an easy way to reach the previous version's documentation. You'll be saving those of us unable to upgrade hours of headaches.

### Conclusion ###

This was really a fun project, made even more fun by the fact that I was able to try so many new libraries. I'm hooked on this distributed event-driven architecture. It just makes sense when you're working with JavaScript. Events are its whole raison d'être, and building whole applications like this feels natural.

I felt like I had the time and ability to do some really good work on the map and all the JavaScript on the site. I'm really proud about how it turned out.

The site is more than just the JavaScript, though. There was a lot of PHP/Drupal work on this site, including interacting with the LinkedIn API in a major way as well some big assists on the HTML/CSS. But those are other people's blog posts to write.