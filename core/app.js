const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const app = new Koa();
const router = require('./router');
const middleFunction = require('./middlewares/middle-function');
const errorHandler = require('./middlewares/error-handler');
const apiPort = process.env.API_PORT || 3200;
const { client } = require('websocket');

start();
async function start() {
  const wsClient = await new Promise((resolve, reject) => {
    const ws = new client();
    setTimeout(() => {
      reject(null);
    }, 5000);

    ws.connect(`ws://127.0.0.1:${process.env.ADMIN_PORT || 3100}`);
    ws.on('connect', () => {
      resolve(ws);
    });
  });

  if (wsClient) {
    wsClient.on('message', (data) => {
      console.log(data);
    })
  }

  app
    .use(cors())
    .use(bodyParser())
    .use(middleFunction())
    .use(errorHandler())
    .use(router.routes());

  app.listen(apiPort, () => {
    console.log(`API runing on port ${apiPort}. Process ID: ${process.pid}`);
  });

}
