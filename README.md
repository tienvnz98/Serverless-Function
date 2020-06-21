# Serverless service opensource.

## Introduction
<blockquote>
This service provide a solution fast to building and deploy backend REST Full API service on your server. 

The service built on Node JS runtime and KoaJS framework.

Other than any serverless function, not highly personalized. With this service, you can custom all API and deploy it very fast without release and building a docker images.
</blockquote>

## How to setup it.

### With Docker.
**Command:**
```
$ docker volume create serverless_function

$ docker run -d -p 4100:4100 -p 4200:4200 --restart=always -v serverless_function:/core -e FAST_DEPLOY=true tiennm0298/serverless-function:latest
```

**Result Container Runing:**

**Admin API**
```
curl --location --request GET 'localhost:4100/admin/home'

Serverless admin API runing.
```

**Public API**
```
curl --location --request GET 'localhost:4200/api/function_invocations/home'

Serverless function homepage!
```
<h2>Environment</h2>

<table>
  <tr>
    <th>Name</th>
    <th>Decription</th>
    <th>Default</th>
    <th>Require</th>
  </tr>
  <tr>
    <td>ADMIN_PORT</td>
    <td>Admin API port access to Admin API controller.</td>
    <td>4100</td>
    <td>true</td>
  </tr>
  <tr>
    <td>API_PORT</td>
    <td>Public API port</td>
    <td>4200</td>
    <td>true</td>
  </tr>
  <tr>
    <td>ENABLE_BASIC_AUTH</td>
    <td>Basic auth for acess admin API</td>
    <td>false</td>
    <td>option</td>
  </tr>
  <tr>
    <td>ADMIN_USER</td>
    <td>Admin user for basic auth </td>
    <td>null</td>
    <td>true when ENABLE_BASIC_AUTH=true</td>
  </tr>
  <tr>
    <td>ADMIN_PASS</td>
    <td>Admin password for basic auth </td>
    <td>null</td>
    <td>true when ENABLE_BASIC_AUTH=true</td>
  </tr>
  <tr>
    <td>DEPLOY_TIMEOUT</td>
    <td>Maximum time the child process start up. This time include 
package installation time.</td>
    <td>60</td>
    <td>true</td>
  </tr>
  <tr>
    <td>FAST_DEPLOY</td>
    <td>Deploy when create, update, delete function or middleware.</td>
    <td>false</td>
    <td>option</td>
  </tr>
</table>


## APIs Guide.

### Admin APIs.
- First, you can get health status Admin API on: `http://localhost:{ADMIN_PORT}/admin/home`

- Make sure the admin service is active.

- The path prefix admin API is /admin/

#### Functions
- [Create function](./docs/functions/create.md)
- [Read function](./docs/functions/read.md)
- [Update new function](./docs/functions/update.md)
- [Delete new function](./docs/functions/delete.md)

#### Middlewares

- [Create function](./docs/middlewares/create.md)
- [Read function](./docs/middlewares/read.md)
- [Update new function](./docs/middlewares/update.md)
- [Delete new function](./docs/middlewares/delete.md)

#### Deploy action
<blockquote>
If you using option FAST_DEPLOY=false. You need to request action deploy after create, update, or delete function:

<code> GET http://localhost:4100/admin/process/deploy</code>
</blockquote>