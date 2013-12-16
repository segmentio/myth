
var assert = require('assert');
var fs = require('fs');
var myth = require('..');
var path = require('path');

/**
 * Test cases.
 */

var cases = [
  'calc',
  'color',
  'font-variant',
  'hex',
  'prefixes',
  'vars'
];

/**
 * Tests.
 */

describe('myth', function () {
  cases.forEach(test);
});

/**
 * Generate a test from a test case `name`.
 *
 * @param {String} name
 */

function test (name) {
  it('should rework ' + name, function () {
    var input = read(name);
    var output = read(name + '.out');
    assert.equal(myth(input).trim(), output.trim());
  });
}

/**
 * Read a fixture by `filename`.
 *
 * @param {String} filename
 * @return {String}
 */

function read (filename) {
  var file = path.resolve(__dirname, 'fixtures', filename + '.css');
  return fs.readFileSync(file, 'utf8');
}