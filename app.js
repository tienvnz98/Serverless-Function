const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const app = new Koa();
const WebSocket = require('websocket').server;
const { startChildProcess } = require('./libs/process-control');

const router = require('./admin-controllers');
const adminPort = process.env.ADMIN_PORT || 4100;
const errorHandler = require('./middlewares/error-handler');
const middleFunction = require('./middlewares/middle-function');
const { childProcess } = require('./libs/event-emitor');

async function startApp() {
  app
    .use(cors())
    .use(bodyParser())
    .use(middleFunction())
    .use(errorHandler())
    .use(router.routes());

  const server = app.listen(adminPort, () => {
    console.log(`Admin API runing on port ${adminPort}. Process ID: ${process.pid}`);
  });

  const wsServer = new WebSocket({
    httpServer: server,
    autoAcceptConnections: true
  });

  childProcess.init(wsServer);

  startChildProcess();
}

startApp();

