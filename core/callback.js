'use strict';


const dirTree = require('directory-tree');
const notFound = require('./not-found');

function callback() {
  const callbackMap = {
    'not-found': notFound
  };
  const tree = dirTree('./functions');

  if (tree) {
    for (const item of tree.children) {
      if (item && item.name && item.extension === '.js') {
        const functionName = item.name.replace(item.extension, '');
        const func = require(`./functions/${functionName}`);

        if (func.handers && typeof (func.handers) === 'function') {
          callbackMap[functionName] = func.handers;
        }
      }
    }
  }

  return callbackMap;
}

module.exports = callback();