'use strict';


module.exports.handlers = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    return ctx.showError(ctx, err.message, err.status || 500);
  }
}

module.exports.order = 2;
