'use strict';


const Router = require('koa-router');
const router = new Router();
const createFunction = require('./functions/create');
const updateFunction = require('./functions/update');
const readFunction = require('./functions/read');
const deleteFunction = require('./functions/delete');

const createMiddleware = require('./middlewares/create');
const updateMiddleware = require('./middlewares/update');
const readMiddleware = require('./middlewares/read');
const deleteMiddleware = require('./middlewares/delete');
const deploy = require('./deploy');

router.get('/admin/home', async (ctx) => {
    ctx.body = 'Serverless admin API runing.';
});

router.get('/admin/function/tree', readFunction.tree);
router.get('/admin/function/read', readFunction.read);
router.delete('/admin/function/delete', deleteFunction);
router.post('/admin/function/create', createFunction);
router.post('/admin/function/update', updateFunction);

router.get('/admin/middleware/tree', readMiddleware.tree);
router.get('/admin/middleware/read', readMiddleware.read);
router.delete('/admin/middleware/delete', deleteMiddleware);
router.post('/admin/middleware/create', createMiddleware);
router.post('/admin/middleware/update', updateMiddleware);

router.get('/admin/process/deploy', deploy.deploy);

module.exports = router;