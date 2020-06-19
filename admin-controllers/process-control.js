const httpRequest = require('../libs/http-request');
const { execLiveCommand, execCommand } = require('../libs/command');

module.exports.killChildProcess = async (ws) => {
    ws.emit('kill_process');
    console.log('Send kill process done!');
}

module.exports.start = function start() {
    execLiveCommand(['cd ./core', 'node app.js']);
};
