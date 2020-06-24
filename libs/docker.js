'use strict';

const { Docker } = require('node-docker-api');
const socketPath = process.env.DOCKER_SOCKET_PATH || '/var/run/docker.sock';
const docker = new Docker({ socketPath: socketPath });


const filterAliveIp = async (listIP = []) => {
  const { getStatus } = require('./forward-http');

  const listAlive = [];
  const dataPromise = [];

  for (const ip of listIP) {
    const prm = getStatus(ip).then(res => {
      if (res) listAlive.push(ip);
    });
    dataPromise.push(prm);
  }

  await Promise.all(dataPromise);

  return listAlive;
}

const listAvliveContainer = async (imagesName) => {
  const listContainer = [];
  const list = await docker.container.list().catch(err => []);

  for (const container of list) {
    let imgName = container.data && container.data.Image ? container.data.Image.split('@')[0] : '';
    imgName = imgName.split(':')[0]; // remove version tag for search

    if (imgName === imagesName && (container.data.State === 'running')) {
      const networks = [];

      if (container.data.NetworkSettings && container.data.NetworkSettings.Networks) {

        const listNet = container.data.NetworkSettings.Networks;
        const netName = Object.keys(listNet);

        for (const name of netName) {
          const item = listNet[name];
          if (item.IPAddress) {
            networks.push(item.IPAddress);
          }
        }
      }

      const item = {
        id: container.id,
        imageName: imgName,
        networks: networks
      }
      listContainer.push(item);
    }
  }
  const dataPromise = [];

  for (const item of listContainer) {
    item.networks = filterAliveIp(item.networks);
    dataPromise.push(item.networks);
  }

  await Promise.all(dataPromise);

  return listContainer;
}

module.exports.listAvliveContainer = listAvliveContainer;