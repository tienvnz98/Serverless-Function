'use strict';


const fs = require('fs');
const { killChildProcess } = require('../../libs/process-control');
const dirTree = require('directory-tree');
const funcPath = './core/functions';

module.exports = async (ctx) => {
  const dir = dirTree(funcPath);
  const history = dirTree(`${funcPath}/history`);

  const { script, name } = ctx.request.body;

  if (!script || !name) {
    return ctx.showError(ctx, 'Invalid request!');
  }

  if (dir && dir.children && history) {
    const functionDir = dir.children.find(item => item.name === `${name}.js`);
    const historyDir = history.children.find(item => item.name === `${name}`);

    if (!historyDir) {
      await new Promise((resolve, reject) => {
        fs.mkdir(`${funcPath}/history/${name}`, (err) => {
          if (err) reject(err);
          resolve(true);
        })
      })
    }

    if (functionDir) {
      // backup old script
      const oldScript = await fs.readFileSync(`${funcPath}/${name}.js`, 'utf8');

      if (oldScript.trim() !== script.trim()) {
        await fs.writeFileSync(`${funcPath}/history/${name}/${new Date().getTime()}.js`, oldScript);

      }

      await fs.writeFileSync(`${funcPath}/${name}.js`, script);
      killChildProcess();

      return ctx.showResult(ctx, 'Update success!', 200);
    }

    return ctx.showError(ctx, `Not found function ${name}`, 404);
  }
}