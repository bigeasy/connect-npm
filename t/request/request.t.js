#!/usr/bin/env node

require("proof")(2, function (step, equal, ok) {
  var connect = require("connect"),
      request = require("request"),
      app, server;

  app = connect()
    .use(connect.static(__dirname + "/public"))
    .use(require('../..')({
      modules: [ "send" ],
      require: require,
      format: "/npm/%s.js"
    }));
               
        
  step(function () {
    server = app.listen(7654, step());
  }, function () {
    request("http://127.0.0.1:7654/npm/send.js", step());
  }, function (response, body) {
    equal(response.statusCode, 200, "found");
    request("http://127.0.0.1:7654/npm/request.js", step());
  }, function (response, body) {
    equal(response.statusCode, 404, "not found");
    server.close();
  });
});
