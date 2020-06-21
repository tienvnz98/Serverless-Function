'use strict';


const { client } = require('websocket');

module.exports = async () => {
  const wsClient = await new Promise((resolve, reject) => {
    const ws = new client();
    const timeout = setTimeout(() => {
      console.log("Can not connect to manager!");
      resolve(null);
      process.exit(1);
    }, 10000);
    const wsUrl = `ws://127.0.0.1:${process.env.ADMIN_PORT || 4100}`;

    ws.connect(wsUrl);
    ws.on('connect', (connection) => {
      clearTimeout(timeout);
      console.log('Process connected ws on adress ' + wsUrl);
      resolve(connection);
    });
  });

  if (wsClient) {
    wsClient.on('message', (data) => {
      if (data && data.utf8Data === 'kill_process') {
        process.exit(1);
      }
    });

    wsClient.on('close', (data) => {
      console.log("Disconnect from server!");
    });
  } else {
    process.exit(1);
  }
}