var send = require("send"),
    util = require("util"),
    parse = require("url").parse,
    normalize = require("path").normalize;

// The module consists of a single function.
module.exports = function (options) {
  // Set default format and a default of no modules.
  var format = options.format || "/npm/%s",
      modules = options.modules || {},
      actual = {};
  // This will raise an exception with an error code of `MODULE_NOT_FOUND` if
  // the module cannot be resolved.
  modules.forEach(function (module) {
    actual[util.format(format, module)] = options.require.resolve(module);
  });
  // If the URL is requesting a module we've been permitted to send, send it,
  // otherwise move onto the next handler.
  return function (req, res, next) {
    var url = parse(req.url), path = normalize(url.pathname), module;
    if (module = actual[path]) {
      send(req, module).pipe(res);
    } else {
      next();
    }
  }
}
