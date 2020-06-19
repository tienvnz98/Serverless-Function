class ChildProcess {
  constructor() {
    this._initialized = false;
    this._ws = {};
  }

  async init(wsServer) {
    const that = this;
    // Already initialized
    if (this._initialized === true) return;
    this._initialized = true;
  }

  static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

module.exports = ChildProcess.Instance;
