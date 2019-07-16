# TripeHound's fork of Vorpal

## This Fork

This is essentially a personal-use fork of [dhthree/vorpal](https://github.com/dthree/vorpal). I wanted to add
both command-line-driven and interactive-prompt facilities to a program I was writing and ended up looking at
Vorpal. While it did a lot of what I wanted, there were some areas where I wanted it to behave differently
(see below). I started by modifying the local `node-modules` version, but decided it would be better to push my
changes to a fork of the original.

Feel free to download/clone/fork from this, or even submit pull-requests, but bear in mind:

* This is my first fork of a Git repository, so I may need to feel my way around a bit...

* As this is _primarily_ for personal use, while I won't refuse to look at a pull-request, at this
  stage, I'll be mostly focusing on what I need to change.

* For the time being, I'll only be working under Windows. I am not yet able to check whether any of my changes
  (let alone any pull-requests!) work under Unix.

* I have not yet looked into getting any automatic tests running.

* All credit for Vorpal goes to dthree and other contributors to the original version; any blame for what I've
  done to it lies with me.


## My Changes (not yet pushed)

### FileCompleter

Vorpal allows for command/parameter auto-completion. I have added file-name completion. Because I work primarily
under Windows, I wanted to mimic the Windows command-prompt behaviour whereby repeatedly pressing `TAB` will
cycle through all filenames that match what has been entered so far. There _is_ an option to use a Unix-like
file-completion (show all files that match what has been entered, and allow the user to refine their choice) but it
is not fully working at the moment.

### Ability to Stay Interactive

Vorpal _either_ allows you to specify a command on the command-line, in which case it executes it and exits, _or_
to enter an interactive prompt where you can give multiple commands. I have added the ability to do both: run a
command from the command-line then remain interactive. I would also like to provide the ability to enter _multiple_
commands on the command-line (with or without staying interactive) but have not got to this yet.

Documentation on the above should follow once I get my local changes into this fork and ready for pushing.


## Other Points

* At the time of writing, the main Vorpal repository hasn't been updated for around 11 months (August 2018) and
  dhthree has said they are not able to invest much time in maintaining it. _Should_ any new commits be made to
  the original (and I notice them) I will probably try to pull them into my fork (providing they don't totally
  break my modifications :-) ), but make no promises at this stage.

* The current commit of Vorpal (and therefore of my fork) shows four issues from the `npm audit` command:
  [https://npmjs.com/advisories/1065] (twice), [https://npmjs.com/advisories/782], and
  [https://npmjs.com/advisories/577]. As far as I can see, these are caused by out-of-date copies of
  `loadsh` (one used directly by Vorpal, one indirectly by an old version of `inquirer`). Later versions of
  both `loadsh` and `inquirer` seem to have fixed all problems, but break "semver" with the rest of Vorpal.
 
  As the problems seem relatively
  minor (some `lodash` functions fail to prevent you accidentally modifying the prototype of `Object`; something
  you can deliberately do anyway) I will probably not look to update the affected modules unless or until I get
  the full testing suite running.

* The original Vorpal has a `2.0-ts` branch where, seemingly, an attempt at conversion to TypeScript was started.
  However, this doesn't appear to have been updated any more recently than the master branch. I seem to remember
  seeing a comment either on an issue/pull-request/elsewhere that someone else had created _their_ fork to
  convert Vorpal to TypeScript, but (a) I cannot find the link at the moment, and (b) from what I remember of
  it, they were only something like 58% through the process.
  
* I will try to organize things so that creating pull-request of my changes back to the original version of Vorpal
  should be possible, but creating a PR is not my top priority.

Regards,
TripeHound.

----

## <center>Original README below</center>

----

# Vorpal

[![Build Status](https://travis-ci.org/dthree/vorpal.svg)](https://travis-ci.org/dthree/vorpal/)
<a href="https://www.npmjs.com/package/vorpal">
  <img src="https://img.shields.io/npm/dt/vorpal.svg" alt="NPM Downloads" />
</a>
[![Package Quality](http://npm.packagequality.com/shield/vorpal.svg)](http://packagequality.com/#?package=vorpal)
<a href="https://www.npmjs.com/package/vorpal">
  <img src="https://img.shields.io/npm/v/vorpal.svg" alt="NPM Version" />
</a>
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> Conquer the command-line.

```text
              (O)
              <M
   o          <M
  /| ......  /:M\------------------------------------------------,,,,,,
(O)[ vorpal ]::@+}==========================================------------>
  \| ^^^^^^  \:W/------------------------------------------------''''''
   o          <W
              <W
              (O)
```

Vorpal is Node's first framework for building interactive CLI applications. With a simple and powerful API, Vorpal opens the door to a new breed of rich, immersive CLI environments like [cash](https://github.com/dthree/cash) and [wat](https://github.com/dthree/wat).

## Notice

This is now an [OPEN Open Source](http://openopensource.org/) project. I am not able to invest a significant amount of time into maintaining Vorpal and so am looking for volunteers who would like to be active maintainers of the project. If you are interested, shoot me a note.

## Contents

* [Introduction](#introduction)
* [Getting Started](#getting-started)
* [API](#api)
* [Extensions](#extensions)
* [FAQ](#faq)
* [License](#license)

## Introduction

Inspired by and based on [commander.js](https://www.npmjs.com/package/commander), Vorpal is a framework for building immersive CLI applications built on an interactive prompt provided by [inquirer.js](https://www.npmjs.com/package/inquirer). Vorpal launches Node into an isolated CLI environment and provides a suite of API commands and functionality including:

* [x] Simple, powerful command creation
* [x] Supports optional, required and variadic arguments and options
* [x] Piped commands
* [x] Persistent command history
* [x] Built-in help
* [x] Built-in tabbed auto-completion
* [x] Command-specific auto-completion
* [x] Customizable prompts
* [x] Extensive terminal control
* [x] Custom event listeners
* [x] And more

Vorpal supports [community extensions](https://github.com/vorpaljs/awesome-vorpaljs), which empower it to do awesome things such as [piping commands to less](https://github.com/vorpaljs/vorpal-less), [importing commands live](https://github.com/vorpaljs/vorpal-use) or supporting a [built-in REPL](https://github.com/vorpaljs/vorpal-repl).

Made with :heart: by [dthree](https://github.com/dthree).

## Getting Started

##### Quick Start

Install `vorpal` into your project:

```bash
$ npm install vorpal --save
```

Create a `.js` file and add the following:

```js
const vorpal = require('vorpal')();

vorpal
  .command('foo', 'Outputs "bar".')
  .action(function(args, callback) {
    this.log('bar');
    callback();
  });

vorpal
  .delimiter('myapp$')
  .show();
```
This creates an instance of Vorpal, adds a command which logs "bar", sets the prompt delimiter to say "myapp$", and shows the prompt.

Run your project file. Your Node app has become a CLI:

```bash
$ node server.js
myapp~$
```

Try out your "foo" command.

```bash
myapp~$ foo
bar
myapp~$
```

Now type "help" to see Vorpal's built in commands in addition to "foo":

```bash
myapp~$ help

  Commands

    help [command]    Provides help for a given command.
    exit [options]    Exits instance of Vorpal.
    foo               Outputs "bar".

myapp~$
```

There's the basics. Once you get the hang of it, [follow this tutorial](http://developer.telerik.com/featured/creating-node-js-command-line-utilities-improve-workflow/) or read on to learn what else Vorpal can do.

##### Community

Questions? Use the `vorpal.js` StackOverflow tag for fast answers that help others, or jump into chat on Gitter.

- [Stack Overflow](http://stackoverflow.com/questions/tagged/vorpal.js) 
- [Gitter Chat](https://gitter.im/dthree/vorpal?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) 
- [Vorpal extensions](https://github.com/vorpaljs/awesome-vorpaljs#vorpal-extensions) 
- [Projects made with Vorpal](https://github.com/vorpaljs/awesome-vorpaljs) 
- [Follow @vorpaljs](https://twitter.com/vorpaljs) 

## [API](https://github.com/dthree/vorpal/wiki)

##### [Command](https://github.com/dthree/vorpal/wiki/api-|-vorpal.command)
- [`vorpal.command`](https://github.com/dthree/vorpal/wiki/api-%7C-vorpal.command#vorpalcommandcommand-description)
- [`command.description`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.command#commanddescriptionstring)
- [`command.alias`](https://github.com/dthree/vorpal/wiki/api-%7C-vorpal.command#commandaliasname-names)
- [`command.parse`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.command#commandparseparsefunction)
- [`command.option`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.command#commandoptionstring-description)
- [`command.hidden`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.command#commandhidden)
- [`command.remove`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.command#commandremove)
- [`command.help`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.command#commandhelp)
- [`command.autocomplete`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.command#commandautocompletearray-or-object-or-function)
- [`command.action`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.command#commandactionfunction)
- [`command.cancel`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.command#commandcancelfunction)

##### [Mode](https://github.com/dthree/vorpal/wiki/API-|-vorpal.mode)
- [`vorpal.mode`](https://github.com/dthree/vorpal/wiki/API-%7C-vorpal.mode#vorpalmodecommand-description)
- [`mode.delimiter`](https://github.com/dthree/vorpal/wiki/API-|-vorpal.mode#modedelimiterstring)
- [`mode.init`](https://github.com/dthree/vorpal/wiki/API-|-vorpal.mode#modeinitfunction)
- [`mode.action`](https://github.com/dthree/vorpal/wiki/API-|-vorpal.mode#modeactionfunction)

##### [Catch](https://github.com/dthree/vorpal/wiki/API-|-vorpal.catch)
- [`vorpal.catch`](https://github.com/dthree/vorpal/wiki/API-%7C-vorpal.catch#catchcommand-description)

##### [CommandInstance](https://github.com/dthree/vorpal/wiki/API-|-CommandInstance)
- [`commandInstance.log`](https://github.com/dthree/vorpal/wiki/API-%7C-CommandInstance#commandinstancelogstring-strings)
- [`commandInstance.prompt`](https://github.com/dthree/vorpal/wiki/API-%7C-CommandInstance#commandinstancepromptobject-callback)
- [`commandInstance.delimiter`](https://github.com/dthree/vorpal/wiki/API-%7C-CommandInstance#commandinstancedelimiterstring)

##### [UI](https://github.com/dthree/vorpal/wiki/api-|-vorpal.ui)
- [`ui.delimiter`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.ui#uidelimitertext)
- [`ui.input`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.ui#uiinputtext)
- [`ui.imprint`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.ui#uiimprint)
- [`ui.submit`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.ui#uisubmittext)
- [`ui.cancel`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.ui#uicancel)
- [`ui.imprint`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.ui#uiimprint)
- [`ui.redraw`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.ui#uiredrawtext-text)
- [`ui.redraw.clear`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.ui#uiredrawclear)
- [`ui.redraw.done`](https://github.com/dthree/vorpal/wiki/api-|-vorpal.ui#uiredrawdone)

##### [Vorpal](https://github.com/dthree/vorpal/wiki/API-|-vorpal)
- [`.parse`](https://github.com/dthree/vorpal/wiki/API-%7C-vorpal#vorpalparseargv-options)
- [`.delimiter`](https://github.com/dthree/vorpal/wiki/API-%7C-vorpal#vorpaldelimiterstring)
- [`.show`](https://github.com/dthree/vorpal/wiki/API-%7C-vorpal#vorpalshow)
- [`.find`](https://github.com/dthree/vorpal/wiki/API-%7C-vorpal#vorpalfindstring)
- [`.exec`](https://github.com/dthree/vorpal/wiki/API-%7C-vorpal#vorpalexeccommand-callback)
- [`.execSync`](https://github.com/dthree/vorpal/wiki/API-%7C-vorpal#vorpalexecsynccommand-options)
- [`.log`](https://github.com/dthree/vorpal/wiki/API-%7C-vorpal#vorpallogstring-strings)
- [`.history`](https://github.com/dthree/vorpal/wiki/API-%7C-vorpal#vorpalhistoryid)
- [`.localStorage`](https://github.com/dthree/vorpal/wiki/API-%7C-vorpal#vorpallocalstorageid)
- [`.help`](https://github.com/dthree/vorpal/wiki/API-%7C-vorpal#vorpalhelpfunction)
- [`.pipe`](https://github.com/dthree/vorpal/wiki/API-%7C-vorpal#vorpalpipefunction)
- [`.use`](https://github.com/dthree/vorpal/wiki/API-%7C-vorpal#vorpaluseextension)

##### [Events](https://github.com/dthree/vorpal/wiki/Docs-%7C-Events)


## Extensions

You can build your own Vorpal commands and extensions.

- [List of awesome extensions](https://github.com/vorpaljs/awesome-vorpaljs#vorpal-extensions)
- [Building your own extension](https://github.com/dthree/vorpal/wiki/Docs-%7C-Creating-Extensions)


## [FAQ](https://github.com/dthree/vorpal/wiki/FAQ)

- [What is an "immersive CLI app?"](https://github.com/dthree/vorpal/wiki/FAQ#what-is-an-immersive-cli-app)
- [Wasn't this called Vantage?](https://github.com/dthree/vorpal/wiki/FAQ#uh-wasnt-this-called-vantage)


## Why Vorpal?

```text
One, two! One, two! and through and through
The vorpal blade went snicker-snack!
He left it dead, and with its head
He went galumphing back.

Lewis Carroll, Jabberwocky
```


##### Life Goals:

- <s>Build a popular framework based on the [Jabberwocky](https://en.wikipedia.org/wiki/Jabberwocky) poem.</s>


## License

MIT © [David Caccavella](https://github.com/dthree)
