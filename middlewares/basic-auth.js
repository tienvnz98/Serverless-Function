'use strict';


const base64 = require('base-64');

module.exports = () => {
  const enable = process.env.ENABLE_BASIC_AUTH === 'true' ? true : false;
  const adminUserName = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASS;

  if (enable) {
    if (!adminUserName || !adminPassword) {
      console.log('ADMIN_USER or ADMIN_PASS invalid!');
      process.exit(1);
    }

    return async (ctx, next) => {
      let token = ctx.request && ctx.request.headers ? ctx.request.headers.authorization : null;

      if (!token) return ctx.showError(ctx, '401 Unauthorized', 401);

      token = token.replace('Basic', '').trim();

      const userInfo = base64.decode(token).split(':');
      const userName = userInfo[0];
      const password = userInfo[1];

      if ((userName !== adminUserName) || (password !== adminPassword)) {
        return ctx.showError(ctx, '401 Unauthorized', 401);
      }
      
      return await next();
    }
  }

  return async (ctx, next) => {
    await next();
  }
}