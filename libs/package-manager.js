'use strict';


const { exec } = require('child_process');
const dirTree = require('directory-tree');
const fs = require('fs');

const moduleDetect = (context) => {
  // only npm module
  const regexp = /(require\(')([a-zA-Z])(.*)('\))/g;
  let array = context.match(regexp) || [];
  const listModule = array.map(item => item.replace(`require('`, '').replace(`')`, ''));

  return listModule;
};
const installPackage = async (pkgName) => {

  console.log(`Process install package ${pkgName}.`);

  const exist = await new Promise((resolve) => {
    try {
      require.resolve(pkgName);
      resolve(true);
    } catch (e) {
      resolve(false);
    }
  });

  if (exist) {
    console.log(`${pkgName} already exist!`);
    return true;
  }

  const res = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      console.log('Install package timeout after 30s.');
      reject('Install package timeout after 30s.');
    }, 30000);

    exec(`npm install --save ${pkgName}`, (err, stdout, stderr) => {
      clearTimeout(timeout);
      resolve('Child process terminal: ' + (err || stdout || stderr));
    });
  }).catch(err => null);

  if (res) {
    const curentPackage = require('../package.json');
    const listModule = Object.keys(curentPackage.dependencies);
    const field = listModule.find(item => item.indexOf(pkgName) !== -1);

    if (field) {
      console.log(`Success install module ${pkgName} version ${curentPackage.dependencies[field]}.`)
      return true;
    }
  }

  console.log(`Can't install package ${pkgName}.`);
  return false;
}

const installAnyPackage = async (modules) => {
  const dataPromise = [];
  for (const item of modules) {
    dataPromise.push(installPackage(item));
  }

  const res = await Promise.all(dataPromise);

  if (res.indexOf(false) !== -1) return false;

  return true;
};

const scanPackage = async (path) => {
  const tree = dirTree(path);
  const packages = [];

  if (tree && tree.children) {
    for (const item of tree.children) {
      if (item.extension === '.js') {
        const content = await fs.readFileSync(item.path, 'utf8');
        (moduleDetect(content) || []).forEach(moduleName => {
          if (packages.indexOf(moduleName) === -1) packages.push(moduleName);
        });;
      }
    }
  }

  return packages;
};

module.exports = {
  moduleDetect,
  installPackage,
  installAnyPackage,
  scanPackage
}