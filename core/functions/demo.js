const moment = require('moment');

module.exports.handlers = async (ctx) => {
    return ctx.showResult(ctx, `This demo function. Now is ${moment()}.`, 200);
}