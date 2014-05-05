
var colors = require('colors');
var pad = require('pad-component').left;

/**
 * Log.
 *
 * @param {String} type
 * @param {String} message
 */

exports.log = function(type, message){
  padding();
  log(type, message);
};

/**
 * Fatal, exits the process with an error.
 *
 * @param {String} type
 * @param {String} message
 */

exports.fatal = function(type, message){
  if (padded) console.log();
  padding();
  error(type, message, 'red');
  process.exit(1);
};

/**
 * Throw a pretty fatal error from an `err`.
 *
 * @param {Error} err
 */

exports.throw = function(err){
  if (padded) console.log();
  padding();

  // node errors (or faulty plugins)
  if (!err.position) {
    error('error', err.toString(), 'red', 'red');
    err.stack.split('\n').slice(1).forEach(function(line){
      error('', line.slice(2));
    });
  }

  // rework plugin errors
  else {
    var pos = err.position;
    var start = pos.start;
    var end = pos.end;
    var lines = err.css.split('\n');

    error('error', err.toString(), 'red', 'red');
    error('', '  at ' + pos.source + ':' + start.line + ':' + start.column);
    error();

    for (var i = start.line - 3; i < end.line + 2; i++) {
      var line = lines[i];
      if (line === undefined) continue;
      var color = i == start.line - 1 ? 'red' : 'grey';
      error((i + 1).toString(), '  ' + line, color, color);
    }
  }

  process.exit(1);
};

/**
 * Log to stdout.
 */

function log(){
  var msg = format.apply(this, arguments);
  console.log(msg);
}

/**
 * Log to stderr.
 */

function error(){
  var msg = format.apply(this, arguments);
  console.error(msg);
}

/**
 * Format a `type` and `msg` with `typeColor` and `msgColor`.
 *
 * @param {String} type
 * @param {String} msg
 * @param {String} typeColor (optional)
 * @param {String} msgColor (optional)
 */

function format(type, msg, typeColor, msgColor){
  type = type || '';
  msg = msg || '';
  typeColor = typeColor || 'blue';
  msgColor = msgColor || 'grey';
  type = pad(type, 12);
  return type[typeColor] + ' · ' + msg[msgColor];
}

/**
 * Add padding to the output.
 */

var padded = false;

function padding(){
  if (padded) return;
  console.log();
  process.on('exit', function(){ console.log(); });
  padded = true;
}