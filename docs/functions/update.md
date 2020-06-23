# Create new function

## Request: 
```js 
POST: ${host}:${ADMIN_PORT}/admin/function/update
{
    "name": "function_name",
    "script":  "const moment = require('moment'); module.exports.handlers = async(ctx)=>{ return ctx.showResult(ctx, moment(), 200); }"
}
```

### Response: 
```
{
    "success": true,
    "data": "Deploy success!"
}
```
