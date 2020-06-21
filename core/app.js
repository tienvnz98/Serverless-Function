'use strict';


const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const app = new Koa();
const customMiddle = require('./load-middle');
const router = require('./router');
const apiPort = process.env.API_PORT || 4200;
const webSocket = require('./websocket');

(async () => {
  await webSocket();

  app.use(cors());
  app.use(bodyParser());
  
  for (const func of customMiddle) {
    app.use(func.handers);
  }

  app.use(router.routes());
  app.listen(apiPort, () => {
    console.log(`API runing on port ${apiPort}. Process ID: ${process.pid}`);
  });

})()
