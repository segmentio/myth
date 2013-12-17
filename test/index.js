
var assert = require('assert');
var fs = require('fs');
var myth = require('..');
var path = require('path');

/**
 * Features.
 */

var features = [
  'calc',
  'color',
  'font-variant',
  'hex',
  'prefixes',
  'vars'
];

/**
 * Examples.
 */

var examples = [
  'myth.io'
];

/**
 * Tests.
 */

describe('myth', function () {
  features.forEach(function (name) {
    test(name, 'features/' + name);
  });

  examples.forEach(function (name) {
    test(name, 'examples/' + name);
  });
});

/**
 * Generate a test from a test case `name` and `fixture`.
 *
 * @param {String} name
 * @param {String} fixture
 */

function test (name, fixture) {
  it('should rework ' + name, function () {
    var input = read(fixture);
    var output = read(fixture + '.out');
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
  var file = path.resolve(__dirname, filename + '.css');
  return fs.readFileSync(file, 'utf8');
}