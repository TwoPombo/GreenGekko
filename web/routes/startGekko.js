const _ = require('lodash');
const cache = require('../state/cache');
const apiKeyManager = cache.get('apiKeyManager');
const gekkoManager = cache.get('gekkos');

const base = require('./baseConfig');

// starts an import
// requires a post body with a config object
module.exports = (ctx) => {
  const mode = ctx.request.body.mode;

  let config = {};

  _.merge(config, base, ctx.request.body);

  // Attach API keys
  if (config.trader && config.trader.enabled && !config.trader.key) {

    const keys = apiKeyManager._getApiKeyPair(config.watch.exchange);

    if (!keys) {
      ctx.body = 'No API keys found for this exchange.';
      return;
    }

    _.merge(
      config.trader,
      keys
    );
  }

  ctx.body = gekkoManager.add({config, mode});
}
