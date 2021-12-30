const fs = require('file-system');
const gekkoRoot = __dirname + '/../../';

const strategiesConfigPath = `${gekkoRoot}config/strategies`;

module.exports = async (ctx) => {
  const strategies = [];
  const strategyParamsDir = [];

  await fs.recurseSync(`${gekkoRoot}strategies`, ['*.js'], async (_, filename) => {
    strategies.push({name: filename.slice(0, -3)});
  });
  await fs.recurseSync(strategiesConfigPath, ['*.toml'], async (_, filename) => {
    strategyParamsDir.push(filename);
  });

  ctx.body = await Promise.all(strategies.map(async strategy => {
    if (strategyParamsDir.indexOf(`${strategy.name}.toml`)!== -1) {
      strategy.params = await fs.readFileSync(`${strategiesConfigPath}/${strategy.name}.toml`, 'utf8')
    } else {
      strategy.params = '';
    }

    return strategy;
  }));
};
