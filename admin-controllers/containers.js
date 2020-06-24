const { listAvliveContainer } = require('../libs/docker');
const httpRequest = require('../libs/http-request');
const imageName = process.env.IMAGE_NAME || 'tiennm0298/serverless-function';
const adminPort = process.env.ADMIN_PORT || 4100;

module.exports.listContainer = async (ctx) => {
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

  return ctx.showResult(ctx, list, 200);
}