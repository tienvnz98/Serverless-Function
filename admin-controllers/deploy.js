'use strict';

const { childProcess } = require('../libs/event-emitor');
const { killChildProcess } = require('../libs/process-control');

module.exports = async (ctx) => {
  killChildProcess();

  const wsServer = childProcess.getConnection();
  const result = await new Promise(async (resolve, reject) => {
    if (wsServer) {
      const timeout = setTimeout(() => {
        reject('Deploy timeout after 60 seconds!');
      }, 1000);

      wsServer.on('connect', (connection) => {
        connection.on('message', (data) => {
          if (data && data.utf8Data === 'connected') {
            clearTimeout(timeout);
            resolve(true);
          }
        });
      });
    } else {
      console.log('WS server admin error!');
      reject('WS server admin error!');
    }
  });

  return ctx.showResult(ctx, result, 200);
}