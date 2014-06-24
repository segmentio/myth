
var autoprefixer = require('autoprefixer');
var calc = require('rework-calc');
var color = require('rework-color-function');
var customMedia = require('rework-custom-media');
var dirname = require('path').dirname;
var hex = require('rework-hex-alpha');
var importer = require('rework-import');
var noop = function(){};
var Rework = require('rework');
var rebeccapurple = require('rework-rebeccapurple');
var variants = require('rework-font-variant');
var vars = require('rework-vars');

/**
 * Expose `myth`.
 */

module.exports = myth;

/**
 * Rework a CSS `string`, or return the Myth rework plugin.
 *
 * @param {String} string (optional)
 * @param {Object} options (optional)
 *   @property {String} source
 *   @property {Array} browsers
 *   @property {Boolean} compress
 * @return {String}
 */

function myth(string, options){
  if ('object' == typeof string) options = string, string = null;
  options = options || {};

  if ('string' != typeof string) return plugin(options);

  return Rework(string, options)
    .use(plugin(options))
    .toString(options);
}

/**
 * Generate a Myth rework plugin with `options`.
 *
 * @param {Object} options
 * @return {Function}
 */

function plugin(options){
  return function(stylesheet, rework){
    var source = options.source;
    var browsers = options.browsers;
    var variables = vars();

    var prefixes = browsers
      ? autoprefixer()
      : autoprefixer(browsers);

    var imports = 'undefined' == typeof window && source
      ? importer({ path: dirname(source) })
      : noop;

    rework
      .use(imports)
      .use(variables)
      .use(customMedia)
      .use(hex)
      .use(color)
      .use(calc)
      .use(variants)
      .use(rebeccapurple);

    // autoprefixer use another processor, so we need to stringify/autoprefix/reparse
    rework.obj = Rework(prefixes.process(rework.toString()).css, options).obj;
  };
}
