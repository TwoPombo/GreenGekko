const _ = require('lodash');
const fs = require('file-system');

const parts = {
  paperTrader: 'config/plugins/paperTrader',
  candleWriter: 'config/plugins/candleWriter',
  performanceAnalyzer: 'config/plugins/performanceAnalyzer'
}

const gekkoRoot = __dirname + '/../../';

module.exports = (ctx) => {
  console.log(ctx.params.part)
  if(!_.has(parts, ctx.params.part))
    return ctx.body = 'error :(';

  const fileName = gekkoRoot + '/' + parts[ctx.params.part] + '.toml';
  ctx.body = {
    part: fs.readFileSync(fileName, 'utf8')
  }
}
