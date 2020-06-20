'use strict';


module.exports = async (ctx) => {
  return ctx.showError(ctx, 'Not found this function name!', 404);
}