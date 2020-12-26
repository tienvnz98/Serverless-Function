'use strict';

const { childProcess } = require('../libs/event-emitor');
const { killChildProcess } = require('../libs/process-control');

async function deployChildProcess() {
  const wsServer = childProcess.getConnection();

  const result = await new Promise((resolve, reject) => {
    killChildProcess();
    const deployTimeOut = 120;
    const timeout = setTimeout(() => {
      const mgs = `Deploy timeout after ${deployTimeOut} seconds.`;
      console.log('\n' + mgs);

      resolve({
        success: false,
        message: mgs
      });
    }, deployTimeOut * 1000);

    wsServer.on('connect', (connection) => {
      connection.on('message', (data) => {
        if (data && data.utf8Data === 'connected') {
          clearTimeout(timeout);
          resolve({
            success: true,
            message: 'Deploy success!'
          });
        }
      });
    });

  });

  return result;
}

module.exports.deployChildProcess = deployChildProcess;

module.exports.deploy = async (ctx) => {
  const result = await deployChildProcess();
  return result.success ?
    ctx.showResult(ctx, result.message, 200) :
    ctx.showError(ctx, result.message, 400);
}