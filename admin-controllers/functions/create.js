'use strict';


const fs = require('fs');
const dirTree = require('directory-tree');
const funcPath = './core/functions';
const { deployChildProcess } = require('../deploy');

module.exports = async (ctx) => {
  const tree = dirTree(funcPath);
  let { script, name } = ctx.request.body;

  if (!name) {
    return ctx.showError(ctx, 'Invalid request!', 400);
  }

  if (tree && tree.children) {
    const exist = tree.children.find(item => item.name === `${name}.js`);
    if (exist) {
      return ctx.showError(ctx, `Function ${name} already exist. Please update it.`, 400);
    }
  }

  await fs.writeFileSync(`${funcPath}/${name}.js`, script || `const moment = require('moment');\n\nmodule.exports.handlers = async(ctx)=>{\n\n  return ctx.showResult(ctx,'API function: ${name}', 200); \n};`);
  const result = await deployChildProcess().then(res => res.success);

  return result ? ctx.showResult(ctx, 'Created!', 200) : ctx.showError(ctx, 'Fail', 400);
}
