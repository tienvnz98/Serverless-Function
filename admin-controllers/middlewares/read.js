const fs = require('fs');
const dirTree = require('directory-tree');

module.exports.tree = async (ctx) => {
  const tree = dirTree('./core/middlewares');
  return ctx.showResult(ctx, tree || {}, 200);
}

module.exports.read = async (ctx) => {
  try {
    const path = './' + ctx.query.path;
    const content = fs.readFileSync(path, 'utf8');
    return ctx.showResult(ctx, content || '', 200);
  } catch (error) {
    return ctx.showResult(ctx, error.message, 400);
  }
}