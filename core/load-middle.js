'use strict';


const dirTree = require('directory-tree');

function middlewares() {
  const tree = dirTree('./middlewares');
  const middlewares = [];

  if (tree) {
    for (const item of tree.children) {
      if (item && item.name && item.extension === '.js') {
        const functionName = item.name.replace(item.extension, '');
        const callback = require(`./middlewares/${functionName}`);

        if (callback.handlers && (callback.order !== undefined)) {
          middlewares.push(callback);
        }
      }
    }
  }

  return middlewares.sort((item1, item2) => item1.order - item2.order);
}

module.exports = middlewares();