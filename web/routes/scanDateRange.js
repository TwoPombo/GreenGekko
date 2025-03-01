const _ = require('lodash');
const promisify = require('promisify-node');

const scan = promisify(require('../../core/workers/dateRangeScan/parent'));

// starts a scan
// requires a post body with configuration of:
//
// - config.watch
const route = async (ctx) => {
  let config = require('./baseConfig');
  _.merge(config, ctx.request.body);

  ctx.body = await scan(config);
};

module.exports = route;
