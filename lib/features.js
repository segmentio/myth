
var autoprefixer = require('autoprefixer');
var calc = require('rework-calc');
var color = require('rework-color-function');
var dirname = require('path').dirname;
var hexAlpha = require('rework-hex-alpha');
var importer = require('rework-import');
var customMedia = require('rework-custom-media');
var rebeccapurple = require('rework-rebeccapurple');
var Rework = require('rework');
var fontVariant = require('rework-font-variant');
var variables = require('rework-vars');

/**
 * Import.
 *
 * @param {Object} options
 * @return {Function}
 */

exports.import = function(options){
  return 'undefined' == typeof window && options.source
    ? importer({ path: dirname(options.source) })
    : function(){};
};

/**
 * Variables.
 *
 * @param {Object} options
 * @return {Function}
 */

exports.variables = function(options){
  return variables();
};

/**
 * Custom media.
 *
 * @param {Object} options
 * @return {Function}
 */

exports.customMedia = function(options){
  return customMedia;
};

/**
 * Hex alpha.
 *
 * @param {Object} options
 * @return {Function}
 */

exports.hexAlpha = function(options){
  return hexAlpha;
};

/**
 * Color.
 *
 * @param {Object} options
 * @return {Function}
 */

exports.color = function(options){
  return color;
};

/**
 * Calc.
 *
 * @param {Object} options
 * @return {Function}
 */

exports.calc = function(options){
  return calc;
};

/**
 * Font variant.
 *
 * @param {Object} options
 * @return {Function}
 */

exports.fontVariant = function(options){
  return fontVariant;
};

/**
 * Rebecca purple.
 *
 * @param {Object} options
 * @return {Function}
 */

exports.rebeccapurple = function(options){
  return rebeccapurple;
};

/**
 * Prefixes.
 *
 * Unfortunately, Autoprefixer uses a different preprocessor, so we have to give
 * it the CSS string and re-parse it again afterwards.
 *
 * @param {Object} options
 * @return {Function}
 */

exports.prefixes = function(options){
  var prefixes = options.browsers
    ? autoprefixer(browsers)
    : autoprefixer();

  return function(stylesheet, rework){
    var str = rework.toString();
    var css = prefixes.process(str).css;
    rework.obj = Rework(css).obj;
  };
};