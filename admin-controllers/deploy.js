'use strict';

const { childProcess } = require('../libs/event-emitor');
const { killChildProcess } = require('../libs/process-control');

module.exports = async (ctx) => {
  killChildProcess();

  const wsServer = childProcess.getConnection();
  const deployTimeOut = process.env.DEPLOY_TIMEOUT || 60;
  const result = await new Promise((resolve, reject) => {

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

  return result.success ?
    ctx.showResult(ctx, result.message, 200) :
    ctx.showError(ctx, result.message, 400);
}