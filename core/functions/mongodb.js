const mongo = require('mongoose');

module.exports = async (ctx) => {
    return ctx.showResult(ctx, 'Demo mongodb.', 200);
}