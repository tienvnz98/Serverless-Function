const { execLiveCommand } = require('./command');
const { childProcess } = require('./event-emitor');
const { installAnyPackage, scanPackage } = require('./package-manager');

module.exports.killChildProcess = async () => {
  childProcess.killProcess();
  console.log('Send kill process done!');
}

module.exports.startChildProcess = async function start() {
  const list = await scanPackage('./core/functions');
  const result = await installAnyPackage(list);

  if (!result) {
    console.log(`Install package fail. Child process not runing.`);
    return false;
  }

  return execLiveCommand(['cd core', 'node app.js']);
};
