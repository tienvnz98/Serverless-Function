'use strict';
let retry = 0;

class ChildProcess {
  constructor() {
    this._initialized = false;
    this._ws = [];
  }

  async init(wsServer) {
    const that = this;
    // Already initialized
    if (this._initialized === true) return;
    this._initialized = true;

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

  static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

module.exports.childProcess = ChildProcess.Instance;
