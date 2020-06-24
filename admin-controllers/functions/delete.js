'use strict';


const fs = require('fs');
const { deployChildProcess } = require('../deploy');
const { forwardHttp } = require('../../libs/forward-http');

module.exports = async (ctx) => {
  try {
    const path = './' + ctx.query.path;
    const from = (ctx.request.body || {}).from;

    const res = await new Promise((resolve, reject) => {
      fs.unlink(path, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      })
    });

    if (!from) { // send action no any node
      const path = ctx.request.path;
      const body = ctx.request.body;
      const method = ctx.request.method;
      body.from = 'local_swarm';

      forwardHttp(path, method, body);
    }
    if (process.env.FAST_DEPLOY === 'true') {
      const result = await deployChildProcess();
      return result.success ? ctx.showResult(ctx, result.message, 200) : ctx.showError(ctx, result.message, 400);
    }

    return ctx.showResult(ctx, res, 200);
  } catch (error) {
    return ctx.showError(ctx, error.message, 400);
  }
}
