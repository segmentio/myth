
var features = require('./features');
var Rework = require('rework');

/**
 * Expose `myth`.
 */

module.exports = exports = myth;

/**
 * Expose `features`.
 */

exports.features = Object.keys(features);

/**
 * Rework a CSS `string`, or return the Myth rework plugin.
 *
 * @param {String} string (optional)
 * @param {Object} options (optional)
 *   @property {String} source
 *   @property {Array} browsers
 *   @property {Boolean} compress
 *   @property {Object} features
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
    var enabled = options.features || {};
    exports.features.forEach(function(key){
      if (enabled[key] === false) return;
      var plugin = features[key](options);
      rework.use(plugin);
    });
  };
}
