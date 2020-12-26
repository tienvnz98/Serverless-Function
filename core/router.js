'use strict';


const Router = require('koa-router');
const { importData, exportData } = require('./callback');
const router = new Router();

const importHandler = async (ctx) => {
    let functionName = ctx.params.functionName || 'not-found';
    if (!importData[functionName]) {
        functionName = 'not-found';
    }

    return importData[functionName](ctx);
}

const exportHandler = async (ctx) => {
    let functionName = ctx.params.functionName || 'not-found';
    if (!exportData[functionName]) {
        functionName = 'not-found';
    }

    return exportData[functionName](ctx);
}

router.get('/api/function_invocations/home', async (ctx) => {
    return ctx.showResult(ctx, 'Serverless function api homepage!', 200);
});

router.get('/api/function_invocations/import/:functionName', importHandler);
router.post('/api/function_invocations/import/:functionName', importHandler);

router.get('/api/function_invocations/export/:functionName', exportHandler);
router.post('/api/function_invocations/export/:functionName', exportHandler);

// old version. Will remove
router.get('/api/function_invocations/:functionName', exportHandler);
router.post('/api/function_invocations/:functionName', exportHandler);


router.get('/process/kill', () => {
    console.log(`\nchild process id: ${process.pid} is dead!`);
    process.exit(0);
});

module.exports = router;