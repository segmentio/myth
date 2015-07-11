
var assert = require('assert');
var child = require('child_process');
var exec = child.exec;
var spawn = child.spawn;
var fs = require('fs');
var myth = require('..');
var browser = require('../myth.js');
var path = require('path');
var slugify = require('to-slug-case');
var spaceify = require('to-space-case');
var Stream = require('stream').Readable;

/**
 * Myth tests.
 */

describe('myth', function(){
  it('should return a css string', function(){
    assert('string' == typeof myth('body {}'));
  });

  it('should return a rework plugin', function(){
    assert('function' == typeof myth());
  });
});

/**
 * Feature tests.
 */

describe('features', function(){
  myth.features.forEach(function(name){
    var slug = slugify(name);
    var source = resolve('features/' + slug);
    var input = read('features/' + slug);
    var expected = read('features/' + slug + '.out');

    describe(slug, function(){
      it('should add ' + slug + ' node support', function(){
        var css = myth(input, { source: source });
        assert.equal(css.trim(), expected.trim());
      });

      it('should be able to disable ' + slug + ' node support', function(){
        var options = { source: source, features: {} };
        options.features[name] = false;
        var css = myth(input, options);
        assert.notEqual(css.trim(), expected.trim());
        assert.equal(css.trim(), input.trim());
      });

      if ('import' == name) return;

      it('should add ' + slug + ' browser support', function(){
        var css = browser(input);
        assert.equal(css.trim(), expected.trim());
      });

      it('should be able to disable ' + slug + ' browser support', function(){
        var options = { features: {} };
        options.features[name] = false;
        var css = browser(input, options);
        assert.notEqual(css.trim(), expected.trim());
        assert.equal(css.trim(), input.trim());
      });
    });
  });
});

/**
 * Sourcemap tests.
 */

describe('sourcemap', function(){
  it('should contain a correct sourcemap', function(){
    var input = read('sourcemap/in');
    var output = read('sourcemap/out');
    var options = {
      source: './test/sourcemap/in.css',
      sourcemap: true
    };
    var css = myth(input, options);
    debugger;
    assert.equal(css.trim(), output.trim());
  });
});

/**
 * CLI tests.
 */

describe('cli', function(){
  var input = read('cli/input');
  var output = read('cli/input.out');

  afterEach(function(){
    remove('cli/output');
  });

  it('should read from a file and write to a file', function(done){
    exec('bin/myth test/cli/input.css test/cli/output.css', function(err, stdout){
      if (err) return done(err);
      var res = read('cli/output');
      assert.equal(res, output);
      done();
    });
  });

  it('should read from a file and write to stdout', function(done){
    exec('bin/myth test/cli/input.css', function(err, stdout){
      if (err) return done(err);
      assert.equal(stdout, output);
      done();
    });
  });

  it('should read from stdin and write to stdout', function(done){
    var child = exec('bin/myth', function(err, stdout){
      if (err) return done(err);
      assert.equal(stdout, output);
      done();
    });

    child.stdin.write(new Buffer(input));
    child.stdin.end();
  });

  it('should error on non-existant file', function(done){
    exec('bin/myth test/cli/non-existant.css', function(err, stdout, stderr){
      assert(err);
      assert(err.code == 1);
      assert(-1 != stderr.indexOf('not found'));
      done();
    });
  });

  it('should print a nice error', function(done){
    exec('bin/myth test/cli/error.css', function(err, stdout, stderr){
      assert(err);
      assert(err.code == 1);
      assert(-1 != stderr.indexOf('Error'));
      assert(-1 != stderr.indexOf('rework-vars: missing closing ")"'));
      assert(-1 != stderr.indexOf('color('));
      assert(-1 != stderr.indexOf('at '));
      done();
    });
  });

  it('should ignore errors on --ignore-errors', function(done){
    exec('bin/myth --ignore-errors test/cli/error.css', function(err, stdout, stderr){
      if (err) return done(err);
      assert(-1 == stderr.indexOf('Error'));
      assert(-1 == stderr.indexOf('rework-vars: missing closing ")"'));
      assert(-1 == stderr.indexOf('color('));
      assert(-1 == stderr.indexOf('at '));
      done();
    });
  });

  it('should log on --verbose', function(done){
    exec('bin/myth --verbose test/cli/input.css test/cli/output.css', function(err, stdout){
      if (err) return done(err);
      assert(-1 != stdout.indexOf('write'));
      done();
    });
  });

  it('should minify on --compress', function(done){
    exec('bin/myth --compress test/cli/compress.css', function(err, stdout, stderr){
      if (err) return done(err);
      assert.equal(stdout, 'body{color:red;}');
      done();
    });
  });

  myth.features.forEach(function(feature){
    var space = spaceify(feature);
    var slug = slugify(feature);
    var output = read('features/' + slug);
    it('should disable ' + space + ' on --no-' + slug, function(done){
      exec('bin/myth --no-' + slug + ' test/features/' + slug + '.css', function(err, stdout, stderr){
        if (err) return done(err);
        assert.equal(stdout.trim(), output.trim());
        done();
      });
    });
  });
});

/**
 * A few real-life test cases.
 */

describe('cases', function(){
  var cases = [
    'myth.io'
  ];

  cases.forEach(function(name){
    it('should convert ' + name + '\'s css', function(){
      var input = read('cases/' + name);
      var output = read('cases/' + name + '.out');
      assert.equal(myth(input).trim(), output.trim());
    });
  });
});

/**
 * Read a fixture by `filename`.
 *
 * @param {String} filename
 * @return {String}
 */

function read(filename){
  var file = resolve(filename);
  return fs.readFileSync(file, 'utf8');
}

/**
 * Remove a fixture by `filename`.
 *
 * @param {String} filename
 */

function remove(filename){
  var file = resolve(filename);
  if (!fs.existsSync(file)) return;
  fs.unlinkSync(file);
}

/**
 * Resolve a fixture by `filename`.
 *
 * @param {String} filename
 * @return {String}
 */

function resolve(filename){
  return path.resolve(__dirname, filename + '.css');
}
