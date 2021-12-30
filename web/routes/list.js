const cache = require('../state/cache');

module.exports = function(name) {
  return (ctx) => {
    ctx.body = cache.get(name).list();
  }
}
