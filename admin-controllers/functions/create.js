'use strict';


const fs = require('fs');
const { killChildProcess } = require('../../libs/process-control');
const dirTree = require('directory-tree');
const funcPath = './core/functions';

module.exports = async (ctx) => {
  const tree = dirTree(funcPath);
  const { script, name } = ctx.request.body;

  if (!script || !name) {
    return ctx.showError(ctx, 'Invalid request!');
  }

  if (tree && tree.children) {
    const exist = tree.children.find(item => item.name === `${name}.js`);

    if (exist) {
      return ctx.showError(ctx, `Function ${name} already exist. Please update it.`, 400);
    }
  }

  await fs.writeFileSync(`${funcPath}/${name}.js`, script);

  killChildProcess();

  return ctx.showResult(ctx, 'Created!', 201);
}
