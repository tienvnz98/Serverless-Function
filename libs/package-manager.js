'use strict';


const { exec } = require('child_process');
const dirTree = require('directory-tree');
const fs = require('fs');
const path = require('path');

const moduleDetect = (context) => {
  // only npm module
  const lines = context.split(';');
  const regexp = /(require\(')([a-zA-Z])(.*)('\))/g;
  const listMatch = [];

  for (const line of lines) {
    let array = line.match(regexp) || [];
    listMatch.push(...array);
  }

  const listModule = listMatch.map(item => item.replace(`require('`, '').replace(`')`, ''));

  return listModule;
};

const installPackage = async (pkgName) => {
  const exist = await new Promise((resolve) => {
    try {
      require.resolve(pkgName);
      resolve(true);
    } catch (e) {
      resolve(false);
    }
  });

  if (exist) {
    return true;
  }

  const res = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      console.log('\nInstall package timeout after 30s.');
      reject('Install package timeout after 30s.');
    }, 30000 * 2);

    console.log(`\nProcess install package ${pkgName}.`);

    exec(`npm install --save ${pkgName}`, async (err, stdout, stderr) => {
      clearTimeout(timeout);

      if (err) {
        const dir = path.resolve('./core/functions');
        const tree = dirTree(dir);

        // Remove if install pkg fail
        if (tree && tree.children) {
          for (const item of tree.children) {
            if (item.extension === '.js') {
              let content = fs.readFileSync(item.path, 'utf8');

              content = content.replace(`require('${pkgName}');`, `{}; // Package ${pkgName} install fail.\n`);
              content = content.replace(`require('${pkgName}')`, `{}; // Package ${pkgName} install fail.\n`);

              content = content.replace(`require("${pkgName}");`, `{}; // Package ${pkgName} install fail.\n`);
              content = content.replace(`require("${pkgName}")`, `{}; // Package ${pkgName} install fail.\n`);

              fs.writeFileSync(item.path, content);
            }
          }
        }
        
        console.log(err);
      }

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

  return false;
}

const installAnyPackage = async (modules) => {
  const dataPromise = [];
  for (const item of modules) {
    dataPromise.push(installPackage(item));
  }
  const res = await Promise.all(dataPromise);

  return res;
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