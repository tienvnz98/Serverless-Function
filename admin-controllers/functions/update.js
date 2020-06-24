'use strict';


const fs = require('fs');
const dirTree = require('directory-tree');
const funcPath = './core/functions';
const { deployChildProcess } = require('../deploy');
const http = require('../../libs/http-request');

module.exports = async (ctx) => {
  const dir = dirTree(funcPath);
  let history = dirTree(`${funcPath}/history`);

  if (!history) {
    fs.mkdirSync(`${funcPath}/history`);
    history = dirTree(`${funcPath}/history`);
  }

  let { script, name, from } = ctx.request.body;

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

      if (!from) { // send this action no any node

      }
    } else {
      return ctx.showError(ctx, `Not found function ${name}`, 404);
    }


    if (process.env.FAST_DEPLOY === 'true') {
      const result = await deployChildProcess();
      return result.success ? ctx.showResult(ctx, result.message, 200) : ctx.showError(ctx, result.message, 400);

    } else {
      return ctx.showResult(ctx, 'Update success!', 200);
    }
  }

  return ctx.showError(ctx, 'Can not update service.', 200);
}