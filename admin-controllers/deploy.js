'use strict';

const { childProcess } = require('../libs/event-emitor');
const { killChildProcess } = require('../libs/process-control');
const { forwardHttp } = require('./containers');

async function deployChildProcess() {
  const wsServer = childProcess.getConnection();
  const result = await new Promise((resolve, reject) => {
    killChildProcess();
    const deployTimeOut = process.env.DEPLOY_TIMEOUT || 60;
    const timeout = setTimeout(() => {
      const mgs = `Deploy timeout after ${deployTimeOut} seconds.`;
      console.log(mgs);

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
  if (!ctx.request.body && !ctx.request.body.from) {
    forwardHttp(ctx);
  }
  
  return result.success ?
    ctx.showResult(ctx, result.message, 200) :
    ctx.showError(ctx, result.message, 400);
}