#!/usr/bin/env node

require("proof")(1, function (ok) {
  ok(1, "dummy");
});
