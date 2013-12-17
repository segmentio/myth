
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};



require.register("timoxley-next-tick/index.js", Function("exports, require, module",
"\"use strict\"\n\
\n\
if (typeof setImmediate == 'function') {\n\
  module.exports = function(f){ setImmediate(f) }\n\
}\n\
// legacy node.js\n\
else if (typeof process != 'undefined' && typeof process.nextTick == 'function') {\n\
  module.exports = process.nextTick\n\
}\n\
// fallback for other environments / postMessage behaves badly on IE8\n\
else if (typeof window == 'undefined' || window.ActiveXObject || !window.postMessage) {\n\
  module.exports = function(f){ setTimeout(f) };\n\
} else {\n\
  var q = [];\n\
\n\
  window.addEventListener('message', function(){\n\
    var i = 0;\n\
    while (i < q.length) {\n\
      try { q[i++](); }\n\
      catch (e) {\n\
        q = q.slice(i);\n\
        window.postMessage('tic!', '*');\n\
        throw e;\n\
      }\n\
    }\n\
    q.length = 0;\n\
  }, true);\n\
\n\
  module.exports = function(fn){\n\
    if (!q.length) window.postMessage('tic!', '*');\n\
    q.push(fn);\n\
  }\n\
}\n\
//@ sourceURL=timoxley-next-tick/index.js"
));












require.register("component-to-function/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Expose `toFunction()`.\n\
 */\n\
\n\
module.exports = toFunction;\n\
\n\
/**\n\
 * Convert `obj` to a `Function`.\n\
 *\n\
 * @param {Mixed} obj\n\
 * @return {Function}\n\
 * @api private\n\
 */\n\
\n\
function toFunction(obj) {\n\
  switch ({}.toString.call(obj)) {\n\
    case '[object Object]':\n\
      return objectToFunction(obj);\n\
    case '[object Function]':\n\
      return obj;\n\
    case '[object String]':\n\
      return stringToFunction(obj);\n\
    case '[object RegExp]':\n\
      return regexpToFunction(obj);\n\
    default:\n\
      return defaultToFunction(obj);\n\
  }\n\
}\n\
\n\
/**\n\
 * Default to strict equality.\n\
 *\n\
 * @param {Mixed} val\n\
 * @return {Function}\n\
 * @api private\n\
 */\n\
\n\
function defaultToFunction(val) {\n\
  return function(obj){\n\
    return val === obj;\n\
  }\n\
}\n\
\n\
/**\n\
 * Convert `re` to a function.\n\
 *\n\
 * @param {RegExp} re\n\
 * @return {Function}\n\
 * @api private\n\
 */\n\
\n\
function regexpToFunction(re) {\n\
  return function(obj){\n\
    return re.test(obj);\n\
  }\n\
}\n\
\n\
/**\n\
 * Convert property `str` to a function.\n\
 *\n\
 * @param {String} str\n\
 * @return {Function}\n\
 * @api private\n\
 */\n\
\n\
function stringToFunction(str) {\n\
  // immediate such as \"> 20\"\n\
  if (/^ *\\W+/.test(str)) return new Function('_', 'return _ ' + str);\n\
\n\
  // properties such as \"name.first\" or \"age > 18\"\n\
  return new Function('_', 'return _.' + str);\n\
}\n\
\n\
/**\n\
 * Convert `object` to a function.\n\
 *\n\
 * @param {Object} object\n\
 * @return {Function}\n\
 * @api private\n\
 */\n\
\n\
function objectToFunction(obj) {\n\
  var match = {}\n\
  for (var key in obj) {\n\
    match[key] = typeof obj[key] === 'string'\n\
      ? defaultToFunction(obj[key])\n\
      : toFunction(obj[key])\n\
  }\n\
  return function(val){\n\
    if (typeof val !== 'object') return false;\n\
    for (var key in match) {\n\
      if (!(key in val)) return false;\n\
      if (!match[key](val[key])) return false;\n\
    }\n\
    return true;\n\
  }\n\
}\n\
//@ sourceURL=component-to-function/index.js"
));
require.register("component-each/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var toFunction = require('to-function');\n\
var type;\n\
\n\
try {\n\
  type = require('type-component');\n\
} catch (e) {\n\
  type = require('type');\n\
}\n\
\n\
/**\n\
 * HOP reference.\n\
 */\n\
\n\
var has = Object.prototype.hasOwnProperty;\n\
\n\
/**\n\
 * Iterate the given `obj` and invoke `fn(val, i)`.\n\
 *\n\
 * @param {String|Array|Object} obj\n\
 * @param {Function} fn\n\
 * @api public\n\
 */\n\
\n\
module.exports = function(obj, fn){\n\
  fn = toFunction(fn);\n\
  switch (type(obj)) {\n\
    case 'array':\n\
      return array(obj, fn);\n\
    case 'object':\n\
      if ('number' == typeof obj.length) return array(obj, fn);\n\
      return object(obj, fn);\n\
    case 'string':\n\
      return string(obj, fn);\n\
  }\n\
};\n\
\n\
/**\n\
 * Iterate string chars.\n\
 *\n\
 * @param {String} obj\n\
 * @param {Function} fn\n\
 * @api private\n\
 */\n\
\n\
function string(obj, fn) {\n\
  for (var i = 0; i < obj.length; ++i) {\n\
    fn(obj.charAt(i), i);\n\
  }\n\
}\n\
\n\
/**\n\
 * Iterate object keys.\n\
 *\n\
 * @param {Object} obj\n\
 * @param {Function} fn\n\
 * @api private\n\
 */\n\
\n\
function object(obj, fn) {\n\
  for (var key in obj) {\n\
    if (has.call(obj, key)) {\n\
      fn(key, obj[key]);\n\
    }\n\
  }\n\
}\n\
\n\
/**\n\
 * Iterate array-ish.\n\
 *\n\
 * @param {Array|Object} obj\n\
 * @param {Function} fn\n\
 * @api private\n\
 */\n\
\n\
function array(obj, fn) {\n\
  for (var i = 0; i < obj.length; ++i) {\n\
    fn(obj[i], i);\n\
  }\n\
}\n\
//@ sourceURL=component-each/index.js"
));
require.register("component-type/index.js", Function("exports, require, module",
"\n\
/**\n\
 * toString ref.\n\
 */\n\
\n\
var toString = Object.prototype.toString;\n\
\n\
/**\n\
 * Return the type of `val`.\n\
 *\n\
 * @param {Mixed} val\n\
 * @return {String}\n\
 * @api public\n\
 */\n\
\n\
module.exports = function(val){\n\
  switch (toString.call(val)) {\n\
    case '[object Function]': return 'function';\n\
    case '[object Date]': return 'date';\n\
    case '[object RegExp]': return 'regexp';\n\
    case '[object Arguments]': return 'arguments';\n\
    case '[object Array]': return 'array';\n\
    case '[object String]': return 'string';\n\
  }\n\
\n\
  if (val === null) return 'null';\n\
  if (val === undefined) return 'undefined';\n\
  if (val && val.nodeType === 1) return 'element';\n\
  if (val === Object(val)) return 'object';\n\
\n\
  return typeof val;\n\
};\n\
//@ sourceURL=component-type/index.js"
));
require.register("yields-unserialize/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Unserialize the given \"stringified\" javascript.\n\
 * \n\
 * @param {String} val\n\
 * @return {Mixed}\n\
 */\n\
\n\
module.exports = function(val){\n\
  try {\n\
    return JSON.parse(val);\n\
  } catch (e) {\n\
    return val || undefined;\n\
  }\n\
};\n\
//@ sourceURL=yields-unserialize/index.js"
));
require.register("yields-store/index.js", Function("exports, require, module",
"\n\
/**\n\
 * dependencies.\n\
 */\n\
\n\
var each = require('each')\n\
  , unserialize = require('unserialize')\n\
  , storage = window.localStorage\n\
  , type = require('type');\n\
\n\
/**\n\
 * Store the given `key` `val`.\n\
 *\n\
 * @param {String} key\n\
 * @param {Mixed} val\n\
 * @return {Mixed}\n\
 */\n\
\n\
exports = module.exports = function(key, val){\n\
  switch (arguments.length) {\n\
    case 2: return set(key, val);\n\
    case 0: return all();\n\
    case 1: return 'object' == type(key)\n\
      ? each(key, set)\n\
      : get(key);\n\
  }\n\
};\n\
\n\
/**\n\
 * supported flag.\n\
 */\n\
\n\
exports.supported = !! storage;\n\
\n\
/**\n\
 * export methods.\n\
 */\n\
\n\
exports.set = set;\n\
exports.get = get;\n\
exports.all = all;\n\
\n\
/**\n\
 * Set `key` to `val`.\n\
 *\n\
 * @param {String} key\n\
 * @param {Mixed} val\n\
 */\n\
\n\
function set(key, val){\n\
  return null == val\n\
    ? storage.removeItem(key)\n\
    : storage.setItem(key, JSON.stringify(val));\n\
}\n\
\n\
/**\n\
 * Get `key`.\n\
 *\n\
 * @param {String} key\n\
 * @return {Mixed}\n\
 */\n\
\n\
function get(key){\n\
  return null == key\n\
    ? storage.clear()\n\
    : unserialize(storage.getItem(key));\n\
}\n\
\n\
/**\n\
 * Get all.\n\
 *\n\
 * @return {Object}\n\
 */\n\
\n\
function all(){\n\
  var len = storage.length\n\
    , ret = {}\n\
    , key\n\
    , val;\n\
\n\
  for (var i = 0; i < len; ++i) {\n\
    key = storage.key(i);\n\
    ret[key] = get(key);\n\
  }\n\
\n\
  return ret;\n\
}\n\
//@ sourceURL=yields-store/index.js"
));
require.register("myth-site/index.js", Function("exports, require, module",
"\n\
var tick = require('next-tick');\n\
\n\
tick(function () {\n\
  document.body.className = '';\n\
});//@ sourceURL=myth-site/index.js"
));









































require.alias("timoxley-next-tick/index.js", "myth-site/deps/next-tick/index.js");
require.alias("timoxley-next-tick/index.js", "next-tick/index.js");


require.alias("yields-store/index.js", "myth-site/deps/store/index.js");
require.alias("yields-store/index.js", "store/index.js");
require.alias("component-each/index.js", "yields-store/deps/each/index.js");
require.alias("component-to-function/index.js", "component-each/deps/to-function/index.js");

require.alias("component-type/index.js", "component-each/deps/type/index.js");

require.alias("component-type/index.js", "yields-store/deps/type/index.js");

require.alias("yields-unserialize/index.js", "yields-store/deps/unserialize/index.js");
