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
  </tr>
  <tr>
    <th>ADMIN_PORT</th>
    <th>Admin API port access to Admin API controller</th>
    <th>Default</th>
  </tr>
</table>
