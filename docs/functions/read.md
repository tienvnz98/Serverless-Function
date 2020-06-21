# List function

## Request: 

```js 
get: ${host}:${ADMIN_PORT}/admin/function/tree

``` 

### Response: 

```
{

  "success": true,
  "data": {
    "path": "./core/functions",
    "name": "functions",
      "children": [
        {
          "path": "core/functions/demo.js",
          "name": "demo.js",
          "size": 95,
          "extension": ".js",
          "type": "file"
        },
        {
          "path": "core/functions/history",
          "name": "history",
          "children": [
              {
                "path": "core/functions/history/feature",
                "name": "feature",
                "children": [],
                "size": 0,
                "type": "directory"
              }
          ],
                "size": 14,
                "type": "directory"
            }
    ],
    "size": 446,
    "type": "directory"
    }
}

```
# Read function

## Request: 

- path: get from tree
```js 
get: ${host}:${ADMIN_PORT}/admin/function/read?path=String

```