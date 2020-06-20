const http = require('../libs/http-request');

module.exports = () => {
  return async (ctx, next) => {
    ctx.http = http;
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
}