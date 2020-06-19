const Router = require('koa-router');
const router = new Router();
const { killChildProcess } = require('../libs/process-control');
const createFunction = require('./create-function');
const updateFunction = require('./update-function');

router.get('/admin/home', async (ctx) => {
    ctx.body = 'Serverless admin API runing.';
});

router.delete('/admin/chil_process/kill', async (ctx) => {
    killChildProcess();
    ctx.body = 'Child process is dead!';
});

router.post('/admin/chil_process/start', async (ctx) => {
    ctx.body = 'Start child process!';
});

router.post('/admin/function/create', createFunction);
router.post('/admin/function/update', updateFunction);

module.exports = router;