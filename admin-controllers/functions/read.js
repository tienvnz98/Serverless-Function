const fs = require('fs');
const dirTree = require('directory-tree');
const lodash = require('lodash');

module.exports.tree = async (ctx) => {
  const tree = dirTree('./core/functions');

  if (tree) {
    const listExport = lodash.remove(tree.children, (funcName) => {
      return funcName.name.toLowerCase().indexOf('export') !== -1;
    });

    const listImport = lodash.remove(tree.children, (funcName) => {
      return funcName.name.toLowerCase().indexOf('import') !== -1;
    });

    tree.children.push(...listExport);
    tree.children.push(...listImport);
  }

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