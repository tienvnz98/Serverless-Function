const jwt = require('jsonwebtoken');

module.exports.handlers = async (ctx, next) => {
  if (ctx.request.headers && ctx.request.headers.authorization) {
    const token = ctx.request.headers.authorization.replace('Bearer', '').trim();

    try {
      let tokenInfo = jwt.decode(token);

      if (tokenInfo && tokenInfo.ext && tokenInfo.ext.user_info) {
        ctx.user = {
          ...tokenInfo.ext.user_info,
          email: tokenInfo.sub
        }
      }
    } catch (error) {
      console.log('Auth middleware: ', error.message);
      ctx.user = {
        id: null,
        name: null,
        email: null
      }
    }
  } else {
    ctx.user = {
      id: null,
      name: null,
      email: null
    }
  }

  await next();
}

module.exports.order = 3;
