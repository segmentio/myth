
var assert = require('assert');
var fs = require('fs');
var myth = require('..');
var path = require('path');

describe('myth', function () {
  it('should return a css string', function () {
    assert('string' == typeof myth('body {}'));
  });

  it('should return a rework plugin', function () {
    assert('function' == typeof myth());
  });

  describe('features', function () {
    var features = [
      'calc',
      'color',
      'font-variant',
      'hex',
      'prefixes',
      'vars'
    ];

    features.forEach(function (name) {
      it('should add ' + name + ' support', function () {
        var input = read('features/' + name);
        var output = read('features/' + name + '.out');
        assert.equal(myth(input).trim(), output.trim());
      });
    });
  });

  describe('examples', function () {
    var examples = [
      'myth.io'
    ];

    examples.forEach(function (name) {
      it('should convert ' + name + '\'s css', function () {
        var input = read('examples/' + name);
        var output = read('examples/' + name + '.out');
        assert.equal(myth(input).trim(), output.trim());
      });
    });
  });
});

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