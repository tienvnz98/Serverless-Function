const fs = require('fs');
module.exports = async (ctx) => {
  const { script, name } = ctx.request.body;

  if (!script || !name) {
    return ctx.showError(ctx, 'Invalid request!');
  }

  await fs.writeFileSync(`./core/functions/${name}.js`, script);

  ctx.body = 'ok';
}