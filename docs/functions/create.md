# Create new function

## Request: 
```
POST: :${ADMIN_PORT}/admin/function/create
{
    "name": ${function_name},
    "script": ${script_context} 
}
```
### Script context
```javascript
const moment = require('moment');

module.exports.handlers = async(ctx)=>{
    const today = moment();

    return ctx.showResult(ctx,`${today}`, 200);
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