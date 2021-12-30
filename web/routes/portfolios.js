const _ = require('lodash');
const fs = require('file-system');
const gekkoRoot = `${__dirname}/../../`;
const util = require(`${gekkoRoot}/core/util`);
const Portfolio = require(`${gekkoRoot}/exchange/portfolioManager`);
const cache = require('../state/cache');
const manager = cache.get('apiKeyManager');

let config = {};

config.debug = false;
config.silent = false;

util.setConfig(config);

module.exports = async (ctx) => {
  let allBalances = [];
  const executors = [];
  const exchangeNames = [];
  await fs.recurseSync(`${gekkoRoot}exchange/wrappers/`, ['*.js'], async (_,filename) => {
    exchangeNames.push(filename.slice(0, -3));
  });

  exchangeNames.forEach(exchangeName => {
    let portfolio = null;

    try {
      const API = require(`${gekkoRoot}exchange/wrappers/${exchangeName}`);
      const apiKeys = manager._getApiKeyPair(exchangeName);
      if (!apiKeys) {
        return;
      }

      config.key = apiKeys.key;
      config.secret = apiKeys.secret;
      const api = new API(config);

      portfolio = new Portfolio(config, api);
      executors.push(() => new Promise((resolve) => {
        portfolio.setBalances(() => {
          allBalances.push({
            'exchange': exchangeName,
            'balances': portfolio.balances,
          });
          return resolve();
        });
      }));
    } catch (e) {
      ctx.body = e;
      ctx.status = 500;
      return;
    }
  });

  await Promise.all(executors.map(executor => executor()));
  ctx.status = 200;
  ctx.body = allBalances;
}
