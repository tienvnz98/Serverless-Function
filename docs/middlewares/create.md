# Create new middleware

## Request: 
```js 
POST: ${host}:${ADMIN_PORT}/admin/middleware/create
{
    "name": "middleware_name",
    "script":  "module.exports.handers = async(ctx,next)=>{ ctx.body = 'value'; };module.exports.order = 1;"
}
```

### Response: 
```
{
    "success": true,
    "data": "Deploy success!"
}
```