# Myth


  _CSS the way it was imagined._

  Myth is a preprocessor that lets you write pure CSS without having to worry about slow browser support, or even slow spec approval. It's a like CSS polyfill.
  
  [![Build Status](https://travis-ci.org/segmentio/myth.png)](http://travis-ci.org/segmentio/myth)

## Installation

    $ npm install -g myth

## Usage

    $ myth input.css output.css
    # Generated output.css from input.css

## Why?

  Myth lets you write pure CSS while still giving you the benefits of tools like LESS and Sass. You can still use variables and math functions, just like you do in preprocessors. It's like a polyfill for future versions of the spec.

  Some of the features in CSS require runtime calculations, which neither Myth nor preprocessors handle, but what Myth does is let you write your code today in the future syntax, so that your code is future-proof. When browsers finally support these features you won't need to rewrite anything, just start using the cascade!

  Taking plain CSS as an input also means you can use Myth to <em>re-process</em> anyone else's CSS (or another preprocessors output), adding the browser support you need, without having to re-write the code in a completely different syntax.

  Myth is built with <a href="https://github.com/visionmedia/rework">Rework</a> so it's incredibly fast, and has a nice Javascript API in addition to the CLI.

## Example

  An example is the easiest way to explain it. If you write spec-compliant CSS:

```css
:root {
  var-green: #a6c776;
}

a {
  color: var(green);
  font-variant: all-small-caps;
  transition: color 1s;
}

a:hover {
  color: color(var(green) shade(20%));
}

::placeholder {
  opacity: .4;
  transition: opacity 1s;
}

:focus::placeholder {
  opacity: .2;
}
```

  ... Myth will transform it for you, into browser-compliant CSS:

```css
:root {
  var-green: #a6c776;
}

a {
  color: #a6c776;
  -webkit-font-feature-settings: "smcp", "c2sc";
  -moz-font-feature-settings: "smcp", "c2sc";
  font-feature-settings: "smcp", "c2sc";
  font-variant-caps: all-small-caps;
  -webkit-transition: color 1s;
  transition: color 1s;
}

a:hover {
  color: rgb(133, 159, 94);
}

::-moz-placeholder {
  opacity: .4;
  transition: opacity 1s;
}

:-ms-input-placeholder {
  opacity: .4;
  transition: opacity 1s;
}

::-webkit-input-placeholder {
  opacity: .4;
  -webkit-transition: opacity 1s;
  transition: opacity 1s;
}

:focus::-moz-placeholder {
  opacity: .2;
}

:focus:-ms-input-placeholder {
  opacity: .2;
}

:focus::-webkit-input-placeholder {
  opacity: .2;
}
```

## Features

#### Variables
  
  Using the same syntax as the [CSS spec](http://dev.w3.org/csswg/css-variables/). Just like future CSS, but without the cascade. Thanks to [`rework-vars`](https://github.com/visionmedia/rework-vars).

```css
:root {
  var-purple: #847AD1;
}

a {
  color: var(purple);
}
```

#### Math
  
  Using the same syntax as the [CSS spec](http://www.w3.org/TR/css3-values/#calc-notation). Just like future CSS, but without runtime interpolation. Thanks to [`rework-calc`](https://github.com/klei-dev/rework-calc).

```css
pre {
  margin: calc(50px * 2);
}
```

#### Color Manipulation
  
  Using the same syntax as the [CSS spec](http://dev.w3.org/csswg/css-color/#modifying-colors). Thanks to [`rework-color-function`](https://github.com/ianstormtaylor/rework-color-function).

```css
a {
  color: #847AD1;
}

a:hover {
  color: color(#847AD1 tint(20%));
}
```

#### No Prefixes
  
  The prefixes from the most-common *and* most-recent browsers are supported, so you never need to worry about what the current browser support landscape is. Big thanks to [`autoprefixer`](https://github.com/ai/autoprefixer)!

```css
.button {
  background: linear-gradient(to bottom, black, white);
  transition: transform .25s;
}
```

#### And more...

* 4-digit and 8-digit hex color support. [`Spec`](http://dev.w3.org/csswg/css-color/#hex-notation) - [`Thanks`](https://github.com/ianstormtaylor/rework-hex-alpha)
* Font-variant shorthands. [`Spec`](http://www.w3.org/TR/css3-fonts/#font-variant-prop) - [`Thanks`](https://github.com/ianstormtaylor/rework-font-variant)

## API

#### Command Line

```
Usage: myth [<input>] [<output>]

Options:

  -h, --help     output usage information
  -V, --version  output the version number
  -w, --watch    watch the input file for changes
  -v, --verbose  log verbose output for debugging

Examples:

  # pass an input and output file:
  $ myth input.css output.css
  
  # watch the input file for changes:
  $ myth --watch input.css output.css
  
  # unix-style piping to stdin and stdout:
  $ cat input.css | myth | grep background-color
```

#### Node.js

```js
var myth = require('myth');
var fs = require('fs');

var css = fs.readFileSync('index.css', 'utf8');
var converted = myth(css);

fs.writeFileSync('converted.css', converted);
```

  Or use it directly as a Rework plugin:
  
```js
var myth = require('myth');
var rework = require('rework');
var fs = require('fs');

var css = fs.readFileSync('index.css', 'utf8');
var converted = rework(css)
  .use(myth())
  .toString();
  
fs.writeFileSync('converted.css', converted);
```

## License

  The MIT License (MIT)

  Copyright (c) 2013, Segment.io &lt;friends@segment.io&gt;

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
