module.exports = () => {
  return async (ctx, next) => {
    ctx.showResult = (ctx, data, status) => {
      ctx.status = status;
      ctx.body = {
        success: true,
        data: data
      }
    };
    ctx.showError = (ctx, message, status) => {
      ctx.status = status;
      ctx.body = {
        success: false,
        message: message
      }
    };
    await next();
  }
}