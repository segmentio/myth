
# myth

  CSS the way it was imagined.

  Myth is a CSS **post**-processor that lets you write plain old, spec-compliant CSS without having to worry about browser support. It's a CSS polyfill.

  You can use CSS variables, un-prefixed properties, shorthands that haven't been implemented yet, and even a few things that haven't been properly standardized yet as if they were supported everywhere. That way you can still write pure CSS, and when browser support finally lands for variables or a prefixed property, you don't have to change anything, you've been using them the whole time.

### Example

  An example is the easiest way to explain it. If you write spec-compliant CSS:

```css
:root {
  var-green: #a6c776;
}

body {
  font-family: 'Helvetica Neue', sans-serif;
}

a {
  color: var(green);
  font-variant: all-small-caps;
  transition: color 1s;
}

a:hover {
  color: color(var(green) shade(20%));
}

input::placeholder {
  opacity: .4;
  transition: opacity 1s;
}

input:focus::placeholder {
  opacity: .2;
}
```

  ... Myth will transform it for you, into browser-compliant CSS:

```css
:root {
  var-green: #a6c776;
  var-dark-green: #83a552;
}

body {
  font-family: "Helvetica Neue", sans-serif;
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

input::-moz-placeholder {
  opacity: .4;
  transition: opacity 1s;
}

input:-ms-input-placeholder {
  opacity: .4;
  transition: opacity 1s;
}

input::-webkit-input-placeholder {
  opacity: .4;
  -webkit-transition: opacity 1s;
  transition: opacity 1s;
}

input:focus::-moz-placeholder {
  opacity: .2;
}

input:focus:-ms-input-placeholder {
  opacity: .2;
}

input:focus::-webkit-input-placeholder {
  opacity: .2;
}
```

### Command Line API

```
Usage: myth [<input>] [<output>]

Options:

  -h, --help     output usage information
  -V, --version  output the version number

Examples:

  # pass an input and output file
  $ myth input.css output.css

  # write to stdout
  $ myth input.css

  # read from stdin and write to stdout
  $ cat index.css | myth
```

### Node.js API

```js
var myth = require('myth');
var fs = require('fs');
var read = fs.readFileSync;
var write = fs.writeFileSync;

var css = read('index.css', 'utf8');
write('converted.css', myth(css));
```

### License

  The MIT License (MIT)

  Copyright (c) 2013, Segment.io &lt;friends@segment.io&gt;

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.