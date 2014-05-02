Spokes
======

TODO
----

* Get a little id back from the login server. Choose to change state to 
  the stream if it exists on the Spokes API, instead of join.

* [x] Make sure you're storing aspects of the profile with registration.
* [ ] Save the identities object.
* [ ] Make it so that "connecting" when you already have an account logs you straight in without registration!

* [ ] Can I edit the user? (Hardcode the user id.)

* [ ] The device should store my address book against my account.
* [ ] Can I store the profile photo somewhere?

* [ ] Can I display a user Ids list of notifications.

* [ ] Can I notify via a profile?

* [ ] Can I create a new proposal?

* * *

* [ ] On the stream of statements, clicking on anything loads the profile screen.
* [ ] On the top of the screen the header has three parts:
      On the left, an elastic slide-out menu.
      In the centre, a little logo that links to the "statement of intent" screen.
      On the right, a highlightable ticker of number of notifications waiting for you.
* [ ] Left hand drawer contains:
      - Account
      - Log Out
* [ ] Account contains options to edit the various details of your account.
* [ ] And also to add Help (person you interacted with, what you did.) - this causes a notification to be signed-off by the other person.
* [ ] The notification screen contains:
      Requests to add "Help" events to account's ledgers.
      Requests and offers for a meeting related to some help.
* [ ] The profile screen contains buttons to "request/offer help", their name, photo, and most importantly in large text their statement of intent.
* [ ] Below this it will eventually contain a list of "Help" events in the form of a
 vertical timeline.
* [ ] If somebody has accepted your request to meetup, the button will be replaced with
      "Converse" which will load a chat screen similar to the one on Whatsapp.

* Use the $window.
* Can I get a basic APP prototype in my hand before the 24th?
* gyp: binding.gyp not found (cwd: /app)
  gyp ERR! configure error
* get bcrypt installed, too.
* * *

Running `npm install hiredis` attached to terminal... up, run.3083
npm http GET https://registry.npmjs.org/hiredis
npm http 200 https://registry.npmjs.org/hiredis
npm http GET https://registry.npmjs.org/hiredis/-/hiredis-0.1.16.tgz
npm http 200 https://registry.npmjs.org/hiredis/-/hiredis-0.1.16.tgz
npm http GET https://registry.npmjs.org/bindings
npm http 200 https://registry.npmjs.org/bindings
npm http GET https://registry.npmjs.org/bindings/-/bindings-1.2.0.tgz
npm http 200 https://registry.npmjs.org/bindings/-/bindings-1.2.0.tgz

> hiredis@0.1.16 install /app/node_modules/hiredis
> node-gyp rebuild

gyp http GET http://nodejs.org/dist/v0.11.12/node-v0.11.12.tar.gz
gyp http 200 http://nodejs.org/dist/v0.11.12/node-v0.11.12.tar.gz
make: Entering directory `/app/node_modules/hiredis/build'
  CC(target) Release/obj.target/hiredis/deps/hiredis/hiredis.o
  CC(target) Release/obj.target/hiredis/deps/hiredis/net.o
  CC(target) Release/obj.target/hiredis/deps/hiredis/sds.o
  CC(target) Release/obj.target/hiredis/deps/hiredis/async.o
  AR(target) Release/obj.target/deps/hiredis.a
  COPY Release/hiredis.a
  CXX(target) Release/obj.target/hiredis/src/hiredis.o
In file included from ../src/hiredis.cc:3:
../src/reader.h:11: error: expected class-name before '{' token
../src/reader.h:17: error: ISO C++ forbids declaration of 'Arguments' with no type
../src/reader.h:17: error: expected ',' or '...' before '&' token
../src/reader.h:18: error: ISO C++ forbids declaration of 'Arguments' with no type
../src/reader.h:18: error: expected ',' or '...' before '&' token
../src/reader.h:19: error: ISO C++ forbids declaration of 'Arguments' with no type
../src/reader.h:19: error: expected ',' or '...' before '&' token
/app/.node-gyp/0.11.12/deps/v8/include/v8.h: In function 'void init(v8::Handle<v8::Object>)':
/app/.node-gyp/0.11.12/deps/v8/include/v8.h:768: error: 'v8::HandleScope::HandleScope()' is private
../src/hiredis.cc:9: error: within this context
make: *** [Release/obj.target/hiredis/src/hiredis.o] Error 1
make: Leaving directory `/app/node_modules/hiredis/build'
gyp ERR! build error
gyp ERR! stack Error: `make` failed with exit code: 2
gyp ERR! stack     at ChildProcess.onExit (/app/vendor/node/lib/node_modules/npm/node_modules/node-gyp/lib/build.js:267:23)
gyp ERR! stack     at ChildProcess.EventEmitter.emit (events.js:107:17)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (child_process.js:1045:12)
gyp ERR! System Linux 3.8.11-ec2
gyp ERR! command "node" "/app/vendor/node/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
gyp ERR! cwd /app/node_modules/hiredis
gyp ERR! node -v v0.11.12
gyp ERR! node-gyp -v v0.12.2
gyp ERR! not ok
npm ERR! hiredis@0.1.16 install: `node-gyp rebuild`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the hiredis@0.1.16 install script.
npm ERR! This is most likely a problem with the hiredis package,
npm ERR! not with npm itself.
npm ERR! Tell the author that this fails on your system:
npm ERR!     node-gyp rebuild
npm ERR! You can get their info via:
npm ERR!     npm owner ls hiredis
npm ERR! There is likely additional logging output above.

npm ERR! System Linux 3.8.11-ec2
npm ERR! command "/app/vendor/node/bin/node" "/app/vendor/node/bin/npm" "install" "hiredis"
npm ERR! cwd /app
npm ERR! node -v v0.11.12
npm ERR! npm -v 1.4.3
npm ERR! code ELIFECYCLE
npm ERR!
npm ERR! Additional logging details can be found in:
npm ERR!     /app/npm-debug.log
npm ERR! not ok code 0


heroku run "node" "/app/vendor/node/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
Running `node /app/vendor/node/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js rebuild` attached to terminal... up, run.5777
gyp info it worked if it ends with ok
gyp info using node-gyp@0.12.2
gyp info using node@0.11.12 | linux | x64
gyp http GET http://nodejs.org/dist/v0.11.12/node-v0.11.12.tar.gz
gyp http 200 http://nodejs.org/dist/v0.11.12/node-v0.11.12.tar.gz
gyp info spawn python
gyp info spawn args [ '/app/vendor/node/lib/node_modules/npm/node_modules/node-gyp/gyp/gyp_main.py',
gyp info spawn args   'binding.gyp',
gyp info spawn args   '-f',
gyp info spawn args   'make',
gyp info spawn args   '-I',
gyp info spawn args   '/app/build/config.gypi',
gyp info spawn args   '-I',
gyp info spawn args   '/app/vendor/node/lib/node_modules/npm/node_modules/node-gyp/addon.gypi',
gyp info spawn args   '-I',
gyp info spawn args   '/app/.node-gyp/0.11.12/common.gypi',
gyp info spawn args   '-Dlibrary=shared_library',
gyp info spawn args   '-Dvisibility=default',
gyp info spawn args   '-Dnode_root_dir=/app/.node-gyp/0.11.12',
gyp info spawn args   '-Dmodule_root_dir=/app',
gyp info spawn args   '--depth=.',
gyp info spawn args   '--generator-output',
gyp info spawn args   'build',
gyp info spawn args   '-Goutput_dir=.' ]
gyp: binding.gyp not found (cwd: /app)
gyp ERR! configure error
gyp ERR! stack Error: `gyp` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onCpExit (/app/vendor/node/lib/node_modules/npm/node_modules/node-gyp/lib/configure.js:337:16)
gyp ERR! stack     at ChildProcess.EventEmitter.emit (events.js:107:17)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (child_process.js:1045:12)
gyp ERR! System Linux 3.8.11-ec2
gyp ERR! command "node" "/app/vendor/node/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
gyp ERR! cwd /app
gyp ERR! node -v v0.11.12
gyp ERR! node-gyp -v v0.12.2
gyp ERR! not ok

* * *

Tech Considerations?

http://forum.ionicframework.com/t/how-to-make-uploading-files-or-images-using-ionicframwork-or-angularjs/391/9

http://docs.angularjs.org/guide/forms
http://docs.angularjs.org/api/ng/directive/ngModel

Nice looking site: https://www.facebook.com/mobile/messenger

http://famo.us

Audo/Video Talk
https://developer.oovoo.com/registration
https://github.com/songz/cordova-plugin-opentok
http://phonegap.com/blog/2013/06/13/power-your-phonegap-app-with-the-new-showkit-sdk/
http://phono.com

THE PROBLEM
-----------

**Low-level emotional.**

I want to do something and be known doing it.
I don't want to be surrounded by people exactly the same as me.
I want to find people that I can help.
And I want to find people that can help me.
I want to belong to a community of people that see the benefits in being good.

I want to help in ways I'm not currently paid to do.
I want to be able to slowly but surely build a startup from its foundations: people.
I want to find out how to build a good sales team. Who can I talk to?
I want to find a designer for my product idea. Who can I talk to?
I want to bounce off ideas with somebody that thinks differently from me. Who can I talk to?
I want to find a good mentor in X for my kid. Who can I talk to?
I want to know a mathematician.
I want to throw better parties.

**High-level systematic.**

To afford interactions between people of different work roles.
To build high net-worth (measured in helpfulness) heterogenous networks of people.

Philosophy
==========

DNS for phone numbers.
Favourite Nearby Meeting Spot.
Invite your most helpful friends.
Do not launch until I have received critical mass and the networks are forming.
Retention and referral!
How to fight: "all human systems are gamed"
  KISS -> the mechanic must be simple enough to think about.
  Allow for change. Do not staticise everything.
  Make important operations human and costly.

Name: HelpConnect

Lets us answer the question "How can I connect with somebody that can do X?" or
 "Who do I know that can put me in touch with somebody that does X?"

Because connections are currency.

A Helpful Community.

Rather than self-promotion, acts of help become "impressions". The service is
 biased so that if you want to influence somebody you need to help others.

There are aspects of Jelly and LinkedIn here. The vision is to form local communities of trust.

This would have to be bootstrapped the hard way.

Could pivot into hung-like knowledge workers on-tap though would prefer
if I was to create NEW value in the same way that Clarity does.

Direct competitors: Business Cards, Phone Books, Resumes, LinkedIn, Jelly, Clarity.fm, Skillshare, Airpair, etc.

* * *

---

Who is it for?

---

People looking for skilled, trusted people.

People that want to "locally source" these people if at all possible.

People that want to build their reputation by helping others.

People that want to occasionally brush with greatness.

People that want to be insured that those that they do business with are reputable.

People that want to pay more attention to non-"game" activities.

Natural, organic communities that exist organically on other communication mediums.

Skilled/knowledge workers are the aim, but along the way: anybody.

---

Why am I doing this?

---

Because I want to help the little guy.

Not everybody has strong connections, huge markets or credentials they can leverage.

Because the "People You May Know" feature on LinkedIn is junk to me, and so is
the search, and so is the "make an introduction" feature. Inadequate tools.

InMail is full of spam. Email is full of spam.

Because asking somebody to introduce you to X is impossible if they don't know them well enough.

Twitter is too open and non-local. Plus there's no proof that people on there
would commit to helping if it was sprung upon them.

How do I even know if these people that want my help are deserving of it?

It's awkward to ask on Facebook and LinkedIn.

Life is inauthentic: full of self-promoters playing a quantity/messaging game.

Co-founder dating sites which require huge upfront time commits, and are walled.

---

How will this work?

---

The network will be built out of your address book, social networks and notifications.

You can post what you're looking for - and it will be locally sourced: from
your friends, London, and then the world.

If it's too hard to do so with your network, then for a price, you expand the search.

We just need to know who you work with that you respect.

Are good people crying for my help?

---

How do most social networks fare, over others?

---

They are all terrible.

I cannot find these things:

- people I can help.
- people that are good and know to help others.
- people with traits that are different to mine.
- people that have traits that they wish to share with me.
- ways of sharing what I do which do not have to be heavily gamed to work.

I wish to take a bet that money will come as a result of fixing this.

---

What are the standards ways of doing this?

---

LinkedIn, LinkedIn Intro, Rapportive, Smartr, ppln.co

Generally what you do is buy access to huge lists of people.

Or you just connect randomly at a social cost.

And you grow this big number and try to grow your value, through a combination
of credentialising, messaging, social proofing, etc.

Nothing exists unless it's written down. Fraud and spm are winning strategies.

Who you are with, who you can represent yourself as and where you are *IS* your value.

Finally you send out a copy-paste message either asking for a service, or selling one.

Or you have such size/power you receive from others passively.

It creates a low-trust way of doing business/connecting.

Medium is your market value.

---

Prospecting: you look for people that wish to trade what you offer.

Push: you create a message which affects somebody into buying your services.
Pull: you change your messaging, find ways of creating impressions, increase your market size.
Passive Advertising/Marketing: you represent yourself as well as possible in your market.

Credentialisation: you find ways of biasing connections into personally endorsing you.

---

Are there any huge problems that I will face? How am I better?

---

* Finding that first market and creating messaging for it.

* Why would I join the network? Why would I commit? Upfront cost.

* Huge cost to helping people that you don't know are good.

* Cost to helping is essentially very very high to start with.

* Have to reduce this cost.

* A social network is measured on how active it feels.

* The Tragedy of the Commons:
  power to screw others.
  selfish want to be favoured.
  many are selfish.
  "hey i want to help you with bs (lol)
  can you do this extremely impressive task for free (wishful thinking; lol i tricked you)?"

* Human behaviour is illogical.

* Trust is a feeling.

* People's need for status gets in the way.

THOUGHTS:
--------

solutions:
A connection which is MET helps somebody.

by not giving you have very very low visibility. the site is useless to you.
mutual respect.
social reckoning: being banned from the site. or ousted from a network.
common good ==> building powerful networks. wielding power in a network.
business vs trust vs compassion.
common property vs open access vs economics
Smart Contracts

Could I interest somebody in a dinner/lunch meeting with somebody new?

on giving, advertise that person more -- build their network, etc.
keep visible networks incredibly small.
exclusive, hard to get in.

video intro
"I want to help you to build a powerful network
and I want you to help grow a helpful community."

teach a man to fish?
 BUILD FOR THE FEELING

Monetize people's excess capacity.

left and right to go in between the need and the help.

What people want: CHEAP CHEAP CHEAP WORKERS.

"help others,
find your way,
share experiences,
build your reputation,
build diversity and value-addedness,
network your way into powerful connections"

SEARCH FOR SOMETHING WITH THE HELP OF SPOKE. A PARTICULAR PERSON, NOT A TAG/SENTENCE.

Networks viewed tumblr style in a stream:
dribble
github
angel.co
linkedin
(marketers - twitter)

beggars.co is profile photo focused, grid of photos: people. think of the imagery.

Spokes site will have a wheel in old-fashioned style drawing. Take a look at the breue image.
Also take a look at Segment.IO for subduedness.
Image yourself as hub of a spoke visually in a wheel.

When you're feeling down about the uselessness of the idea?
Remember: you are the only one who feels this way.
And it's not been done well yet.
And it can be done, because you have seen this spirit in small communities before.
Ultimately: interests can align when roles don't, this can be natural.
But you can't know what will work until you try everything

buy spokes.xxx to put on a card

Academically?
---------------
http://en.wikipedia.org/wiki/Division_of_labour
http://en.wikipedia.org/wiki/The_Division_of_Labour_in_Society ?
"Our problems are that underlying reality we have resource locality. That is the entity closest to the resource has a greater natural right over it"
http://startupboy.com/2014/04/01/the-fifth-protocol/?q=1
Advice received here: https://twitter.com/sebinsua/status/448192921003896832

Ionic App Base
=====================

A starting project for Ionic that optionally supports
using custom SCSS, and makes it easy to update Ionic through
bower.

## Using this project

We recommend using the `ionic` utility to create new Ionic projects that are based on this project but use a ready-made starter template.

For example, to start a new Ionic project with the default tabs interface, make sure the `ionic` utility is installed:

```bash
$ sudo npm install -g ionic
```

Then run:

```bash
$ sudo npm install -g ionic
$ ionic start myProject tabs
```

More info on this can be found on the Ionic [Getting Started](ionicframework.com/getting-started) page.

## Installation

While we recommend using the `ionic` utility to create new Ionic projects, you can use this repo as a barebones starting point to your next Ionic app.

To use this project as is, first clone the repo from GitHub, then run:

```bash
$ cd ionic-app-base
$ sudo npm install -g bower
$ npm install
$ gulp init
```

This will download the most recent Ionic release from bower, and copy over the SCSS files into `./sass` for future editing.

## Using Sass (optional)

This project makes it easy to use Sass (the SCSS syntax) in your projects. This enables you to override styles from Ionic, and benefit from
Sass's great features.

Just update the `./scss/ionic.app.scss` file, and run `gulp` or `gulp watch` to rebuild the CSS files for Ionic.

Note: if you choose to use the Sass method, make sure to remove the included `ionic.css` file in `index.html`, and then uncomment
the include to your `ionic.app.css` file which now contains all your Sass code and Ionic itself:

```html
<!-- IF using Sass (run gulp sass first), then remove the CSS include above
<link href="css/ionic.app.css" rel="stylesheet">
-->
```
