module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      return ctx.showError(ctx, err.message, err.status || 500);
    }
  }
}