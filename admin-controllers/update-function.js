const fs = require('fs');
const { killChildProcess } = require('../libs/process-control');
const dirTree = require('directory-tree');

module.exports = async (ctx) => {
  const dir = dirTree('./core/functions');
  const history = dirTree('./core/functions/history');

  const { script, name } = ctx.request.body;

  if (!script || !name) {
    return ctx.showError(ctx, 'Invalid request!');
  }

  if (dir && dir.children && history) {
    const functionDir = dir.children.find(item => item.name === `${name}.js`);
    const historyDir = history.children.find(item => item.name === `${name}`);

    if (!historyDir) {
      await new Promise((resolve, reject) => {
        fs.mkdir(`./core/functions/history/${name}`, (err) => {
          if (err) reject(err);
          resolve(true);
        })
      })
    }

    if (functionDir) {
      // backup old script
      const oldScript = await fs.readFileSync(`./core/functions/${name}.js`, 'utf8');

      if (oldScript.trim() !== script.trim()) {
        await fs.writeFileSync(`./core/functions/history/${name}/${new Date().getTime()}.js`, oldScript);

      }

      await fs.writeFileSync(`./core/functions/${name}.js`, script);
      killChildProcess();

      return ctx.showResult(ctx, 'Update success!', 200);
    }

    return ctx.showError(ctx, `Not found function ${name}`, 404);
  }
}