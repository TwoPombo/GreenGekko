const cache = require('../state/cache');
const manager = cache.get('apiKeyManager');

module.exports = {
  get: (ctx) => {
    ctx.body = manager.get();
  },
  add: (ctx) => {
    const content = ctx.request.body;

    manager.add(content.exchange, content.values);

    ctx.body = {
      status: 'ok'
    };
  },
  remove: (ctx) => {
    const exchange = ctx.request.body.exchange;

    manager.remove(exchange);

    ctx.body = {
      status: 'ok'
    };
  }
}
