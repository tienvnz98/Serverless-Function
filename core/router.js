'use strict';


const Router = require('koa-router');
const callback = require('./callback');
const router = new Router();
const handler = async (ctx) => {
    let functionName = ctx.params.functionName || 'not-found';
    if (!callback[functionName]) {
        functionName = 'not-found';
    }
    return callback[functionName](ctx);
};

router.get('/api/function_invocations/home', async (ctx) => {
    return ctx.showResult(ctx, 'Serverless function api homepage!', 200);
});
router.get('/api/function_invocations/:functionName', handler);
router.post('/api/function_invocations/:functionName', handler);
router.put('/api/function_invocations/:functionName', handler);
router.delete('/api/function_invocations/:functionName', handler);

router.get('/process/kill', () => {
    console.log(`\nchild process id: ${process.pid} is dead!`);
    process.exit(0);
});

module.exports = router;