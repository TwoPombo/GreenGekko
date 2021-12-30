const p = require('../../package.json');

// Retrieves API information
module.exports = (ctx) => {
  ctx.body = {
    version: p.version
  }
}
