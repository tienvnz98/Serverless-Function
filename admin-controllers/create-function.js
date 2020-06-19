const fs = require('fs');
const { restartChildProcess } = require('../libs/process-control');

module.exports = async (ctx) => {
  const { script, name } = ctx.request.body;
  if (!script || !name) {
    return ctx.showError(ctx, 'Invalid request!');
  }

  await fs.writeFileSync(`./core/functions/${name}.js`, script);
  restartChildProcess();

  return ctx.showResult(ctx, 'Created!', 201);
}