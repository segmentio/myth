
var autoprefixer = require('autoprefixer');
var calc = require('rework-calc');
var color = require('rework-color-function');
var dirname = require('path').dirname;
var hex = require('rework-hex-alpha');
var inline = require('rework-inline');
var noop = function(){};
var rework = require('rework');
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
 * @return {String}
 */

function myth(string, options){
  if ('object' == typeof string) options = string, string = null;
  options = options || {};

  if (!string) return plugin(options);

  return rework(string, options)
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
      ? autoprefixer().rework
      : autoprefixer(browsers).rework;

    var imports = source
      ? inline({ path: dirname(source) })
      : noop;

    rework
      .use(imports)
      .use(variables)
      .use(hex)
      .use(color)
      .use(calc)
      .use(variants)
      .use(prefixes);
  };
}