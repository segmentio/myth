
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
 * Rework a CSS `string`.
 *
 * @param {String} string
 * @return {String}
 */

function myth (string) {
  return rework(string)
    .use(vars)
    .use(hex)
    .use(color)
    .use(calc)
    .use(variants)
    .use(prefixes)
    .toString();
}