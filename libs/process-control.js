const { execLiveCommand, execCommand } = require('./command');
const { childProcess } = require('./event-emitor');
const { installAnyPackage, scanPackage } = require('./package-manager');
const dirTree = require('directory-tree');
const fs = require('fs');
const path = require('path');
const funcPath = path.resolve('./core/functions');

module.exports.killChildProcess = async () => {
  childProcess.killProcess();
  console.log('Send kill process done!');
}

module.exports.handlerSyntax = handlerSyntax;

module.exports.startChildProcess = async function start() {
  const list = await scanPackage('./core/functions');
  const result = await installAnyPackage(list);
  if (!result) {
    console.log(`\nInstall package fail. Child process not runing.`);
    return false;
  }

  // Check systax all function here before start service
  await handlerSyntax();
  return execLiveCommand(['cd core', 'node --max-old-space-size=4096 app.js']);
};

async function systaxChecker(functionDir) {
  const passed = execCommand([`export FUNCTION_NAME=${functionDir}`, 'node systax-checker'])
    .then(res => {
      console.log(`Systax function ${functionDir} OK!`);
      return true;
    })
    .catch(err => {
      console.log(`Systax function ${functionDir} FAIL!`);
      console.log(err);
      return false;
    });
  return passed;
}

async function handlerSyntax() {
  const functionPassed = {};
  const tree = dirTree(funcPath);
  let dataPromise = [];
  if (tree && tree.children) {
    for (const item of tree.children) {
      if (item.type !== 'directory' && item.extension === '.js') {
        const funcPath = item.path;
        functionPassed[funcPath] = {
          success: false,
          message: ''
        };

        const prm = systaxChecker(funcPath).then(res => {
          if (res) {
            functionPassed[funcPath] = {
              success: true,
              message: 'ok'
            };
          } else {
            functionPassed[funcPath] = {
              success: false,
              message: 'Check syntax and retry!'
            }
          }
        }).catch(err => null);

        dataPromise.push(prm);
      }
    }

    await Promise.all(dataPromise);
  } else {
    // Run service 0 function
    return execLiveCommand(['cd core', 'node --max-old-space-size=4096 app.js']);
  }

  // Comment all conext if function test fail
  for (const path of Object.keys(functionPassed)) {
    const result = functionPassed[path];
    if (!result.success) {
      let oldContext = await fs.readFileSync(path, 'utf-8');
      oldContext = oldContext.replace(/\*\//g, ''); // */
      oldContext = oldContext.replace(/\/\*/g, ''); // /*

      const newContext = `/*\n${oldContext}\n*/\n/*\nError Message:${JSON.stringify(result)}\n*/`;

      fs.writeFileSync(path, newContext);
    }
  }

  // Wait for all file already
  return await new Promise((solve) => {
    setTimeout(() => {
      solve(true);
    }, 500);
  });
}

