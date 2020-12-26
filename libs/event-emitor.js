'use strict';

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
        wsServer.connections = [];
        console.log('\nChild process disconected!');
        const { startChildProcess } = require('./process-control');
        startChildProcess();
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
