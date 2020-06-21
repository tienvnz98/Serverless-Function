'use strict';
let retry = 0;

class ChildProcess {
  constructor() {
    this._initialized = false;
    this._ws = [];
    this._wsServer = null;
  }

  async init(wsServer) {
    // Already initialized
    if (this._initialized === true) return;
    this._initialized = true;

    const that = this;
    this._wsServer = wsServer;

    wsServer.on('connect', (connection) => {
      this._ws.push(connection);
      connection.sendUTF('accecpt');

      connection.on('close', () => {
        console.log('Child process disconected!');
        if (retry < 5) {
          const { startChildProcess } = require('./process-control');
          startChildProcess();
          retry++;
        } else {
          console.log(`Can't connect to child process!`);
        }
      })
    });

  }

  killProcess() {
    for (const connection of this._ws) {
      connection.sendUTF('kill_process');
    }
  }

  getConnection() {
    return this._wsServer;
  }

  static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

module.exports.childProcess = ChildProcess.Instance;
