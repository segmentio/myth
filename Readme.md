
# Myth

  _CSS the way it was imagined._

  Myth is a preprocessor that lets you write pure CSS without having to worry about slow browser support, or even slow spec approval. It's a CSS polyfill.

## Installation

    $ npm install -g myth

## Why?

  Myth lets you write pure CSS and still get the benefits of preprocessors you're used to like variables and math. Since you're writing valid CSS, when browsers finally support these features you won't need to rewrite your code, just remove the preprocessor.

  Taking pure CSS as an input also means you can use Myth to post-process anyone else's CSS, adding the browser support you need, without having to re-write the code in a completely different syntax.

  And finally, Myth is built with [Rework](https://github.com/visionmedia/rework) so it's incredibly fast, and has a nice Javascript API in addition to the CLI.

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
  
  As defined by the [CSS spec](http://dev.w3.org/csswg/css-variables/). Thanks to [`rework-vars`](https://github.com/visionmedia/rework-vars).

```css
:root {
  var-purple: #847AD1;
}

a {
  color: var(purple);
}
```

#### Math
  
  As defined by the [CSS spec](http://www.w3.org/TR/css3-values/#calc-notation). Thanks to [`klei-rework-plugins`](https://github.com/klei-dev/rework-plugins).

```css
pre {
  margin: calc(50px * 2);
}
```

#### Color Manipulation
  
  As defined by [Tab Atkins's soon-to-be-proposed draft](http://rawgithub.com/tabatkins/specs/master/css-color/Overview.html#modifying-colors). Thanks to [`rework-color-function`](https://github.com/ianstormtaylor/rework-color-function).

```css
a {
  color: #847AD1;
}

a:hover {
  color: color(#847AD1 tint(20%));
}
```

#### No Prefixes
  
  So you never need to worry about what the current browser support landscape is. Thanks to [`autoprefixer`](https://github.com/ai/autoprefixer).

```css
.button {
  background: linear-gradient(to bottom, black, white);
  transition: transform .25s;
}
```

#### And more...

* 4-digit and 8-digit hex color support. [`Spec`](http://rawgithub.com/tabatkins/specs/master/css-color/Overview.html#hex-notation) - [`Thanks`](https://github.com/ianstormtaylor/rework-hex-alpha)
* Font-variant shorthands. [`Spec`](http://www.w3.org/TR/css3-fonts/#font-variant-prop) - [`Thanks`](https://github.com/ianstormtaylor/rework-font-variant)


## API

#### Command Line

```
Usage: myth [<input>] [<output>]

Options:

  -h, --help     output usage information
  -V, --version  output the version number

Examples:

  # pass an input and output file
  $ myth input.css output.css
  
  # watch for changes
  $ myth --watch input.css output.css
  
  # stdin and stdout
  $ cat index.css | myth | grep .button
```

#### Node.js

```js
var myth = require('myth');

var css = fs.readFileSync('index.css', 'utf8');
fs.writeFileSync('converted.css', myth(css));
```

## License

  The MIT License (MIT)

  Copyright (c) 2013, Segment.io &lt;friends@segment.io&gt;

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.