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
