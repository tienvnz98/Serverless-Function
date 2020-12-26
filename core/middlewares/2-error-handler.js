'use strict';


module.exports.handlers = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.set('Content-Type', 'application/json');
    const msg = `${err.message}\n${err.stack}`;
    return ctx.showError(ctx, msg || 500);
  }
}

module.exports.order = 2;
