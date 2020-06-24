const http = require('./http-request');
const { listAvliveContainer } = require('./docker');
const httpRequest = require('./http-request');
const imageName = process.env.IMAGE_NAME || 'tiennm0298/serverless-function';
const adminPort = process.env.ADMIN_PORT || 4100;

async function getStatus(ip) {
  const url = `http://${ip}:${adminPort}/status`;

  const res = await new Promise((resolve) => {
    httpRequest(url, 'get').then(res => {
      console.log(res);
      if (res.status === 200) {
        resolve(true);
      }
    });

    setTimeout(() => {
      console.log(url);
      console.log('Request get status container timeout after 10s.');
      resolve(false);
    }, 10000);
  });
  console.log(url + ':', res);

  return res;
}

async function sendRequest(listIP, method, path, body) {

  for (const ip of listIP) {
    const alive = await getStatus(ip);

    if (!alive) continue; // ip not alive

    const url = `http://${ip}:${adminPort}${path}`;
    const res = await http(url, method, {}, body);
    if (res.status === 200) return true;
  }

  return false;
}

module.exports.getStatus = getStatus;
module.exports.forwardHttp = async (method, path, body) => {
  const listContainer = await listAvliveContainer(imageName);
  const dataPromise = [];

  for (const container of listContainer) {
    const listIP = container.networks || [];

    const result = sendRequest(listIP, method, path, body).then(res => {
      if (!res) {
        console.log(`Cant forward request for container id: ${container.id}. IP: ${JSON.stringify(container.networks)}`);
      }

      console.log(res);
      return res;
    });

    dataPromise.push(result);
  }

  return await Promise.all(dataPromise);
}

