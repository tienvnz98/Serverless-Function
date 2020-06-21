# Create new function

## Request: 
```js 
POST: ${host}:${ADMIN_PORT}/admin/function/create
{
    "name": "function_name",
    "script":  "const moment = require('moment'); module.exports.handers = async(ctx)=>{ return ctx.showResult(ctx, moment(), 200); }"
}
```

### Response: 
```
{
    "success": true,
    "data": "Deploy success!"
}
```

### Testing

### Request
${OPTION METHOD}: ${host}:${API_PORT}/api/function_invocations/${function_name}

### Response
```
{
    "success": true,
    "data": "2020-06-21T14:05:30.966Z"
}
```