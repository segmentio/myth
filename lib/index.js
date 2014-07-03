var dirname = require('path').dirname;
var noop = function(){};

var Rework = require('rework');
var importer = require('rework-import');
var vars = require('rework-vars');
var customMedia = require('rework-custom-media');
var hexAlpha = require('rework-hex-alpha');
var color = require('rework-color-function');
var calc = require('rework-calc');
var fontVariant = require('rework-font-variant');
var rebeccapurple = require('rework-rebeccapurple');
var autoprefixer = require('autoprefixer');

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

  var features = options.features || {};
  options.features = {};
  options.features.imports = features.hasOwnProperty('imports') ? features.imports : true;
  options.features.variables = features.hasOwnProperty('variables') ? features.variables : true;
  options.features.customMedia = features.hasOwnProperty('customMedia') ? features.customMedia : true;
  options.features.hexAlpha = features.hasOwnProperty('hexAlpha') ? features.hexAlpha : true;
  options.features.color = features.hasOwnProperty('color') ? features.color : true;
  options.features.calc = features.hasOwnProperty('calc') ? features.calc : true;
  options.features.fontVariant = features.hasOwnProperty('fontVariant') ? features.fontVariant : true;
  options.features.rebeccapurple = features.hasOwnProperty('rebeccapurple') ? features.rebeccapurple : true;

  options.prefixes = features.hasOwnProperty('prefixes') ? features.prefixes : true; // prefixes are not a rework plugin :/

  if ('string' != typeof string) return plugin(options);

  return process(options, Rework(string, options));
}

function process(options, rework, hasPlugin) {
  var source = options.source;
  var css
  var reworkPlugins = {
    imports: 'undefined' == typeof window && source
      ? importer({ path: dirname(source) })
      : noop,
    variables: vars(),
    customMedia: customMedia,
    hexAlpha: hexAlpha,
    color: color,
    calc: calc,
    fontVariant: fontVariant,
    rebeccapurple: rebeccapurple
  }
  var prefixes = autoprefixer(options.browsers);

  Object.keys(options.features)
    .filter(function(feat) { return options.features[feat] })
    .forEach(function(feat) {
      rework.use(reworkPlugins[feat])
    })

  // autoprefixer use another processor
  if (options.prefixes) {
    css = prefixes.process(rework.toString()).css;
    if (!hasPlugin) {
      return css
    }
    // else
    rework.obj = Rework(css, options).obj;
  }
}

/**
 * Generate a Myth rework plugin with `options`.
 *
 * @param {Object} options
 * @return {Function}
 */

function plugin(options){
  return function(stylesheet, rework){
    process(options, rework, true)
  };
}
