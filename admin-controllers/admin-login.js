const base64 = require('base-64');

module.exports = async (ctx) => {
  const enable = process.env.ENABLE_BASIC_AUTH === 'true' ? true : false;
  const adminUserName = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASS;

  if (enable) {
    const { username, password } = ctx.request.body;

    if ((username === adminUserName) && (password === adminPassword)) {
      const token = `Basic ${base64.encode(`${username}:${password}`)}`;
      return ctx.showResult(ctx, token, 200);
    }

    return ctx.showError(ctx, 'Unauthorized!', 401);
  }

  return ctx.showResult(ctx, 'Not required authencation', 200);
}