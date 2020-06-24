const { listAvliveContainer } = require('../libs/docker');
const httpRequest = require('../libs/http-request');
const imageName = process.env.IMAGE_NAME || 'tiennm0298/serverless-function';
const adminPort = process.env.ADMIN_PORT || 4100;
const { getCurrentIP } = require('../libs/currentIP');


const listContainer = async (imageName) => {
  const list = await listAvliveContainer(imageName);
  const dataPromise = [];

  for (const container of list) {
    container.isAlive = [];

    for (const ip of container.networks) {
      const url = `http://${ip}:${adminPort}/status`
      const prm = httpRequest(url).then(res => {
        if (res.status === 200) {
          container.isAlive.push(ip);
        }
      });
      dataPromise.push(prm);
    }
  }
  await Promise.all(dataPromise);

  return list;
}

module.exports.forwardHttp = async (ctx) => {
  const { path, body = {}, method = 'get' } = ctx.request;
  const list = await listContainer(imageName);
  const dataPromise = [];

  body.from = 'local_request';
  const localIp = getCurrentIP();

  for (const container of list) {
    // Skip current container ip
    for (const ip of container.networks) {
      if (localIp.indexOf(ip) === -1) {
        let url = `http://${ip}:${adminPort}${path}`;

        if (Object.keys(ctx.query).length) {
          url = url + '?path=' + ctx.query.path;
        }

        const prm = httpRequest(url, method, {}, body, true).then(res => {
          if (res.status === 200) {
            (`Forward action for ${url} success!`);
          } else {
            console.log(`\nForward action for ${url} fail!`);
          }

          return res;
        });
        dataPromise.push(prm);
      }
    }
  }

  return await Promise.all(dataPromise);
}

module.exports.listContainer = async (ctx) => {
  const list = await listContainer(imageName);
  return ctx.showResult(ctx, list, 200);
}