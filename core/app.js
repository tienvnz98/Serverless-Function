const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const app = new Koa();
const router = require('./router');
const middleFunction = require('./middlewares/middle-function');
const errorHandler = require('./middlewares/error-handler');
const apiPort = process.env.API_PORT || 4200;
const webSocket = require('./websocket');

(async () => {
  await webSocket();
  
  app
    .use(cors())
    .use(bodyParser())
    .use(middleFunction())
    .use(errorHandler())
    .use(router.routes());

  app.listen(apiPort, () => {
    console.log(`API runing on port ${apiPort}. Process ID: ${process.pid}`);
  });

})()
