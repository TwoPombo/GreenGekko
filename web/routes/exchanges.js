const _ = require('lodash');
const fs = require('file-system');
const gekkoRoot = __dirname + '/../../';
const util = require(`${gekkoRoot}/core/util`);
const config = {};

config.debug = false;
config.silent = false;

util.setConfig(config);

module.exports = async (ctx) => {
  const exchangeNames = [];
  await fs.recurseSync(`${gekkoRoot}exchange/wrappers/`, ['*.js'], async (_,filename) => {
    exchangeNames.push(filename.slice(0, -3));
  });

  let allCapabilities = [];

  exchangeNames.forEach(function (exchange) {
    let Trader = null;

    try {
      Trader = require(`${gekkoRoot}exchange/wrappers/${exchange}`);
    } catch (e) {
      console.log(`Failed to load ${exchange}\n ->> ${e}`);
      return;
    }

    if (!Trader || !Trader.getCapabilities) {
      return;
    }

    allCapabilities.push(Trader.getCapabilities());
  });

  ctx.body = allCapabilities;
}
