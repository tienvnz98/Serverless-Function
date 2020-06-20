'use strict';


const Router = require('koa-router');
const router = new Router();
const createFunction = require('./functions/create');
const updateFunction = require('./functions/update');
const readFunction = require('./functions/read');
const deleteFunction = require('./functions/delete');

router.get('/admin/home', async (ctx) => {
    ctx.body = 'Serverless admin API runing.';
});
router.get('/admin/function/tree', readFunction.tree);
router.get('/admin/function/read', readFunction.read);
router.delete('/admin/function/delete', deleteFunction);
router.post('/admin/function/create', createFunction);
router.post('/admin/function/update', updateFunction);

module.exports = router;