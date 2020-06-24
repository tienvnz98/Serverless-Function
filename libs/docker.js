'use strict';

const { Docker } = require('node-docker-api');
const socketPath = process.env.DOCKER_SOCKET_PATH || '/var/run/docker.sock';
const docker = new Docker({ socketPath: socketPath });

const listContainer = async () => {
    const list = await docker.container.list((container) => {
        console.log(Object.keys(container));
    })
}
