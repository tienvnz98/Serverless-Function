module.exports.handlers = async (ctx, next) => {
  ctx.database = {};
  await next();
}

module.exports.order = 0;
