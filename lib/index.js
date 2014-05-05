
var color = require('rework-color-function');
var prefixes = require('autoprefixer');
var rework = require('rework');
var calc = require('rework-calc');
var variants = require('rework-font-variant');
var hex = require('rework-hex-alpha');
var vars = require('rework-vars')();

/**
 * Expose `myth`.
 */

module.exports = myth;

/**
 * Rework a CSS `string`, or return the myth rework plugin.
 *
 * @param {String} string (optional)
 * @param {Object} options (optional)
 * @return {String}
 */

function myth (string, options) {
  /* autoprefix default options */
  var browsers = ['> 1%', 'last 2 versions', 'ff 24', 'opera 12.1'];
  if(options && options.browsers) {
    browsers = options.browsers;
  }

  if ('string' != typeof string) {
    return plugin.bind(this);
  }
  return rework(string, options)
    .use(vars)
    .use(hex)
    .use(color)
    .use(calc)
    .use(variants)
    .use(prefixes(browsers).rework)
    .toString(options);
}

/**
 * Plugin.
 *
 * @param {Object} stylesheet
 * @param {Rework} rework
 */

function plugin (stylesheet, rework) {
  rework
    .use(vars)
    .use(hex)
    .use(color)
    .use(calc)
    .use(variants)
    .use(prefixes(browsers).rework);
}
