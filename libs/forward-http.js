const http = require('./http-request');
const { listAvliveContainer } = require('./docker');
const httpRequest = require('./http-request');
const imageName = process.env.IMAGE_NAME || 'tiennm0298/serverless-function';
const adminPort = process.env.ADMIN_PORT || 4100;

async function getStatus(ip) {
  const url = `http://${ip}:${adminPort}/status`;
  const res = await new Promise((resolve) => {
    httpRequest(url, 'get').then(res => {
      if (res.status === 200) {
        resolve(true);
      }
    });

    setTimeout(() => {
      console.log('Request get status container timeout after 1s.');
      resolve(false);
    }, 1000);
  });

  return res;
}

async function sendRequest(listIP, method, path, body) {

  for (const ip of listIP) {
    if (!await getStatus(ip)) continue; // ip not alive

    const url = `http://${ip}:${adminPort}${path}`;
    const res = await http(url, method, {}, body);
    if (res.status === 200) return true;
  }

  return false;
}


module.exports.forwardHttp = async (method, path, body) => {
  const listContainer = await listAvliveContainer(imageName);
  const dataPromise = [];

  for (const container of listContainer) {
    const listIP = container.networks || [];

    const result = sendRequest(listIP, method, path, body).then(res => {
      if (!res) {
        console.log(`Cant forward request for container id: ${container.id}. IP: ${JSON.stringify(container.networks)}`);
      }

      return res;
    });

    dataPromise.push(result);
  }

  return await Promise.all(dataPromise);
}