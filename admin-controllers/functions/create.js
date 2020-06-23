'use strict';


const fs = require('fs');
const dirTree = require('directory-tree');
const funcPath = './core/functions';
const { deployChildProcess } = require('../deploy');

module.exports = async (ctx) => {
  const tree = dirTree(funcPath);
  let { script, name } = ctx.request.body;

  if (!name) {
    return ctx.showError(ctx, 'Invalid request!');
  }

  if (tree && tree.children) {
    const exist = tree.children.find(item => item.name === `${name}.js`);

    if (exist) {
      return ctx.showError(ctx, `Function ${name} already exist. Please update it.`, 400);
    }
  }

  await fs.writeFileSync(`${funcPath}/${name}.js`, script || `module.exports.handlers = async(ctx)=>{return ctx.showResult(ctx,'API function: ${name}', 200) };`);

  if (process.env.FAST_DEPLOY === 'true') {
    const result = await deployChildProcess();
    return result.success ? ctx.showResult(ctx, result.message, 200) : ctx.showError(ctx, result.message, 400);
  }

  return ctx.showResult(ctx, 'Created!', 201);
}
