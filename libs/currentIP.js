'use strict';

const os = require('os');
const ifaces = os.networkInterfaces();

function getCurrentIP() {
  const listIP = [];
  const netName = Object.keys(ifaces);

  for (const name of netName) {
    for (const item of ifaces[name]) {
      if (item.family === 'IPv4' &&
        !item.internal && item.address &&
        listIP.indexOf(item.address) === -1) {
        listIP.push(item.address);
      }
    }
  }

  return listIP;
}

module.exports.getCurrentIP = getCurrentIP;
