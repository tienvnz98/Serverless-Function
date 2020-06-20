'use strict';


const fs = require('fs');
const { killChildProcess } = require('../../libs/process-control');

module.exports = async (ctx) => {
  try {
    const path = './' + ctx.query.path;
    const res = await new Promise((resolve, reject) => {
      fs.unlink(path, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      })
    });
    
    killChildProcess();

    return ctx.showResult(ctx, res, 200);
  } catch (error) {
    return ctx.showError(ctx, error.message, 400);
  }
}
