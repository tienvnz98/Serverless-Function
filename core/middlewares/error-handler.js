'use strict';


module.exports.handers = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    return ctx.showError(ctx, err.message, err.status || 500);
  }
}

module.exports.order = 2;
