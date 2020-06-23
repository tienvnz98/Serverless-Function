'use strict';


module.exports.handers = async (ctx, next) => {
  ctx.showResult = (ctx, data, status) => {
    ctx.status = status || 200;
    ctx.body = {
      success: true,
      data: data
    }
  };
  ctx.showError = (ctx, message, status) => {
    ctx.status = status || 500;
    ctx.body = {
      success: false,
      message: message
    }
  };
  await next();
}

module.exports.order = 1;
