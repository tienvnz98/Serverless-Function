'use strict';


const dirTree = require('directory-tree');
const notFound = require('./not-found');
const fs = require('fs');

function exportDataCallback() {
  const callbackMap = {
    'not-found': notFound
  };
  const tree = dirTree('./functions');

  if (tree) {
    for (const item of tree.children) {
      if (item && item.name && item.extension === '.js') {
        const functionName = item.name.replace(item.extension, '');
        const func = require(`./functions/${functionName}`);

        if (func.handlers && typeof (func.handlers) === 'function') {
          try {
            callbackMap[functionName] = func.handlers;
            console.log(`Import function ${functionName} Success!`);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  }

  return callbackMap;
}

function importDataCallback() {
  const callbackMap = {
    'not-found': notFound
  };
  const tree = dirTree('./functions');

  if (tree) {
    for (const item of tree.children) {
      if (item && item.name && item.extension === '.js') {
        const functionName = item.name.replace(item.extension, '');
        const func = require(`./functions/${functionName}`);

        if (func.import_handlers && typeof (func.import_handlers) === 'function') {
          try {
            callbackMap[functionName] = func.import_handlers;
            console.log(`Import function ${functionName} Success!`);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  }

  return callbackMap;
}

module.exports.exportData = exportDataCallback();
module.exports.importData = importDataCallback();
