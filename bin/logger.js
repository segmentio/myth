
var colors = require('colors');
var pad = require('pad-component');

/**
 * Padded?
 */

var padded = false;

/**
 * Log.
 *
 * @param {String} type
 * @param {String} message
 */

exports.log = function (type, message) {
  print('log', type, message);
};

/**
 * Info.
 *
 * @param {String} type
 * @param {String} message
 */

exports.info = function (type, message) {
  print('info', type, message);
};

/**
 * Warn.
 *
 * @param {String} type
 * @param {String} message
 */

exports.warn = function (type, message) {
  print('warn', type, message, 'yellow');
};

/**
 * Error.
 *
 * @param {String} type
 * @param {String} message
 */

exports.error = function (type, message) {
  print('error', type, message, 'red');
};

/**
 * Fatal, exits the process with an error.
 *
 * @param {String} type
 * @param {String} message
 */

exports.fatal = function (type, message) {
  print('error', type, message, 'red');
  process.exit(1);
};

/**
 * Print a `message` with `type`, `level` and optional `color`.
 *
 * @param {String} level
 * @param {String} type
 * @param {String} message
 * @param {String} color (optional)
 */

function print (level, type, message, color) {
  if (!padded) {
    console.log();
    process.on('exit', function () { console.log(); });
    padded = true;
  }

  color = color || 'blue';
  type = pad.left(type, 12);
  message = type[color] + ' ~ ' + message.grey;
  console[level](message);
}