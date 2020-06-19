const httpRequest = require('./http-request');
const { execLiveCommand, execCommand } = require('./command');
const { childProcess } = require('./event-emitor');

module.exports.killChildProcess = async () => {
  childProcess.killProcess();
  console.log('Send kill process done!');
}

module.exports.startChildProcess = function start() {
  execLiveCommand(['cd ./core', 'node app.js']);
};
