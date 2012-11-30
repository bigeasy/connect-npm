# Connect NPM [![Build Status](https://secure.travis-ci.org/bigeasy/connect-npm.png?branch=travis-ci)](https://travis-ci.org/bigeasy/connect-npm)

Serve modules directly from your Node.js require path to the browser.

## Usage

```javascript
var connect = require('connect');

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('public'))
  .use(require('connect-npm')({
    modules: [ "reactor", "stencil", "stencil/resolver" ],
    format: "/npm/%s.js"
  });
  .listen(7654);
```
