# Serverless-Function
A simple opensource serverless function. Fast to deploy a simple API service without building a docker image. 

# Create new function
```
POST: http://localhost:{ADMIN_PORT}/admin/function/create
{
    "script": "module.exports = (ctx) => { const a = ctx.request.body.a; const b = ctx.request.body.b; const c = a+b; return ctx.showResult(ctx,c,200); }",
    "name": "add-number2"
}
```

# Update a function
```
POST: http://localhost:{ADMIN_PORT}/admin/function/update
{
    "script": "module.exports = (ctx) => { const a = ctx.request.body.a; const b = ctx.request.body.b; const c = a+b; return ctx.showResult(ctx,c,200); }",
    "name": "add-number2"
}
```

# Tree 
```
GET: http://localhost:{ADMIN_PORT}/admin/function/tree
```

# Read
```
GET: http://localhost:{ADMIN_PORT}/admin/function/read?path=String
```

# Delete
```
GET: http://localhost:{ADMIN_PORT}/admin/function/delete?path=String
```

# Using a Function
```
METHOD: http://localhost:{API_PORT}192.168.9.200:4200/api/function_invocations/${Function_Name};
```