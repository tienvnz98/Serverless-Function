'use strict';


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
const basicAuth = require('./middlewares/basic-auth');
const { childProcess } = require('./libs/event-emitor');

const http = require('./libs/http-request');

async function startApp() {
  app
    .use(cors())
    .use(middleFunction())
    .use(basicAuth())
    .use(bodyParser())
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

