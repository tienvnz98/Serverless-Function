'use strict';

const { Docker } = require('node-docker-api');
const socketPath = process.env.DOCKER_SOCKET_PATH || '/var/run/docker.sock';
const docker = new Docker({ socketPath: socketPath });


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

  return listContainer;
}

module.exports.listAvliveContainer = listAvliveContainer;