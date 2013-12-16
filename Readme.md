
# myth

  CSS the way it was imagined.

  Myth is a CSS **post**-processor that lets you write plain old, spec-compliant CSS without having to worry about browser support. It's a CSS polyfill.

  You can use CSS variables, un-prefixed properties, shorthands that haven't been implemented yet, and even a few things that haven't been properly standardized yet as if they were supported everywhere. That way you can still write pure CSS, and when browser support finally lands for variables or a prefixed property, you don't have to change anything, you've been using them the whole time.

### Example

  An example is the easiest way to explain it. If you write spec-compliant CSS:

```css
:root {
  var-green: #a6c776;
  var-dark-green: #83a552;
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
  color: var(dark-green);
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
  color: #83a552;
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

### Post-processor?

  