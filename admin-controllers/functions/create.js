'use strict';


const fs = require('fs');
const dirTree = require('directory-tree');
const funcPath = './core/functions';
const { deployChildProcess } = require('../deploy');
const { listAvliveContainer } = require('../../libs/docker');


module.exports = async (ctx) => {
  const tree = dirTree(funcPath);
  let { script, name, from } = ctx.request.body;

  if (!name) {
    return ctx.showError(ctx, 'Invalid request!');
  }

  if (tree && tree.children) {
    const exist = tree.children.find(item => item.name === `${name}.js`);

    if (exist) {
      return ctx.showError(ctx, `Function ${name} already exist. Please update it.`, 400);
    }
  }

  await fs.writeFileSync(`${funcPath}/${name}.js`, script || `const moment = require('moment');\n\nmodule.exports.handlers = async(ctx)=>{\n\n  return ctx.showResult(ctx,'API function: ${name}', 200); \n};`);

  if (!from) { // send action no any node
    const path = ctx.request.path;
    const body = ctx.request.body;
    const method = ctx.request.method;
    body.from = 'local_swarm';

    const listContainer = await listAvliveContainer('tiennm0298/serverless-function');
    console.log(listContainer);
  }

  if (process.env.FAST_DEPLOY === 'true') {
    const result = await deployChildProcess();
    return result.success ? ctx.showResult(ctx, result.message, 200) : ctx.showError(ctx, result.message, 400);
  }

  return ctx.showResult(ctx, 'Created!', 201);
}
