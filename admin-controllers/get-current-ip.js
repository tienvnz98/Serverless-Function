'use strict';

const os = require('os');
const ifaces = os.networkInterfaces();

const getLocalIp = () => {
  const listIP = [];
  const netName = Object.keys(ifaces);

  for (const name of netName) {
    const list = ifaces[name];

    for (const item of list) {
      if (item.family === 'IPv4' && !item.internal) {
        listIP.push(item.address);
      }
    }
  }

  return listIP;
}

module.exports.localIpAdress = getLocalIp();
