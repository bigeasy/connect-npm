# Connect NPM

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
