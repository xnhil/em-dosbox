DOSBox ported to Emscripten
===========================

About
-----

[DOSBox](http://www.dosbox.com/) is an open source DOS emulator designed for
running old games. [Emscripten](https://github.com/kripken/emscripten)
compiles C/C++ code to JavaScript. This is a version of DOSBox which can be
compiled with Emscripten to run in a web browser. It allows running old DOS
games and other DOS programs in a web browser.

DOSBox is distributed under the GNU General Public License. See the
[COPYING file](https://github.com/dreamlayers/em-dosbox/blob/em-dosbox-0.74/COPYING)
for more information.

Status
------

Currently, DOSBox compiles and runs various real-mode games successfully.
DOSBox has not been fully re-structured for running in a web browser via the
Emscripten main loop. Some programs can cause DOSBox to run a loop without
returning control to the browser, causing DOSBox to appear to hang.
The interactive DOS prompt cannot be used and leads to a
hang. DOSBox can only run programs via command line arguments.

Other issues
------------

* Emscripten issues
[1975](https://github.com/kripken/emscripten/issues/1975) and
[1992](https://github.com/kripken/emscripten/issues/1992) were problems in
the past. Use Emscripten 1.8.11 or later.
* Emscripten [issue 1909](https://github.com/kripken/emscripten/issues/1909)
makes some switch statements highly inefficient. The main switch statements
used for CPU emulation end up using long chains of comparisons, making DOSBox
very slow. This problem does not have a proper fix. This
[patch](https://gist.github.com/dreamlayers/8463670) is not totally correct,
but it can be used and gives good performance in Firefox.
* V8 JavaScript Engine [issue
2275](http://code.google.com/p/v8/issues/detail?id=2275) prevents large switch
statements from being optimized. Because of this and emscripten issue 1909,
the simple, normal and prefetch cores are automatically transformed. Case
statements for x86 instructions become functions, and an array of function
pointers is used instead of the switch statements. The `--enable-funarray`
configure option controls this and defaults to yes.
* The same origin policy prevents access to data files when running via a
file:// URL in Chrome. Use a web server such as `python -m SimpleHTTPServer`
instead.
* In Firefox, ensure that
[dom.max\_script\_run\_time](http://kb.mozillazine.org/Dom.max_script_run_time)
 is set to a reasonable value that will allow you to regain control in case of
a hang.
* Firefox may use huge amounts of memory when starting asm.js builds which have
not been minified.

Compiling
---------

Configure with `emconfigure ./configure` and build with `make`.
This will create `src/dosbox.js` which contains DOSBox and `src/dosbox.html`,
a web page for use as a template by the packager. These cannot be used as-is.
You need to provide DOSBox with files to run and command line arguments for
running them.

This branch supports use of SDL 2, but uses SDL 1 by default. To use SDL 2,
give the `--with-sdl2` option to `./configure`. Emscripten will automatically
fetch SDL 2 from Emscripten Ports and build it. If you want to use a different
copy of SDL 2, specify a path as in
`./configure --with-sdl2=/path/to/SDL-emscripten`.

Packaging DOS programs
----------------------

Web pages for running DOS programs can be created using `src/packager.py`. If
you have an executable which needs no other files such as `Gwbasic.exe`, you
can package it via `./packager.py gwbasic Gwbasic.exe`. That will create
`gwbasic.html` and `gwbasic.data`. Placing those in the same directory as
`dosbox.js` and viewing `gwbasic.html` will run the program. If you need to
package multiple files, place them in a directory, and package that directory,
specifying which executable to run. For examle, if Major Stryker is in
subdirectory `major_stryker`, package it using `./packager.py stryker
major_stryker STRYKER.EXE`. Again, place `stryker.html` and `stryker.data` in
the same directory as `dosbox.js` and view `stryker.html` to run the game.
Remember that the same origin policy prevents access to data files in some
browsers when using file:// URLs.

Credits
-------

Most of the credit belongs to the
[DOSBox crew](http://www.dosbox.com/crew.php).
They created DOSBox and made it compatible with a wide variety of DOS games.
[Ismail Khatib](https://github.com/CeRiAl) got DOSBox
to compile with Emscripten, but didn't get it to work.
[Boris Gjenero](https://github.com/dreamlayers)
started with that and got it to work. Then, Boris re-implemented
Ismail's changes a cleaner way, fixed issues and improved performance to make
many games usable in web browsers.
