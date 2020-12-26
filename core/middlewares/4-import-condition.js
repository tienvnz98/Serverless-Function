module.exports.handlers = async (ctx, next) => {
  const exist = ctx.request.url.indexOf('/api/function_invocations/import/') !== -1;
  if (exist) {

    if (ctx.request.method.toLowerCase() !== 'post') {
      delete ctx.request.body;
    } else {
      const body = ctx.request.body;
      const { activity } = body || {};

      if (!activity || !activity.user || !activity.user.id || !activity.user.name || !activity.user.email) {
        return ctx.showError(ctx, 'Invalid Request!', 401);
      }
    }
  }

  await next();
}

module.exports.order = 4;
