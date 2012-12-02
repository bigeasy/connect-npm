#!/usr/bin/env node

require("proof")(2, function (async, equal, ok) {
  var connect = require("connect"),
      request = require("request"),
      app, server;

  app = connect()
    .use(connect.static(__dirname + "/public"))
    .use(require('../..')({
      modules: [ "send" ],
      format: "/npm/%s.js"
    }));
               
        
  async(function () {
    server = app.listen(7654, async());
  }, function () {
    request("http://127.0.0.1:7654/npm/send.js", async());
  }, function (response, body) {
    equal(response.statusCode, 200, "found");
    request("http://127.0.0.1:7654/npm/request.js", async());
  }, function (response, body) {
    equal(response.statusCode, 404, "not found");
    server.close();
  });
});
