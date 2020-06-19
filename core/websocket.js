const { client } = require('websocket');

module.exports = async () => {
  const wsClient = await new Promise((resolve, reject) => {
    const ws = new client();

    const timeout = setTimeout(() => {
      console.log("Can not connect to manager!");
      resolve(null);
    }, 5000);

    ws.connect(`ws://127.0.0.1:${process.env.ADMIN_PORT || 4100}`);
    ws.on('connect', (connection) => {
      clearTimeout(timeout);
      resolve(connection);
    });
  });

  if (wsClient) {
    wsClient.on('message', (data) => {
      if (data && data.utf8Data === 'kill_process') {
        process.exit(1);
      } else {
        console.log(data);
      }
    });

    wsClient.on('close', (data) => {
      console.log("Disconnect from server!");
    });
  } else {
    process.exit(1);
  }
}