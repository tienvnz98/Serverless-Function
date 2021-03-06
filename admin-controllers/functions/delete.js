'use strict';


const fs = require('fs');
const { deployChildProcess } = require('../deploy');


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

    const result = await deployChildProcess();
    return result.success ? ctx.showResult(ctx, result.message, 200) : ctx.showError(ctx, result.message, 400);
  } catch (error) {
    return ctx.showError(ctx, error.message, 400);
  }
}
