
var color = require('rework-color-function');
var prefixes = require('autoprefixer')().rework;
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
 * @param {String} [string]
 * @return {String}
 */

function myth (string) {
  if ('string' != typeof string) return plugin;
  return rework(string)
    .use(plugin)
    .toString();
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
    .use(prefixes);
}