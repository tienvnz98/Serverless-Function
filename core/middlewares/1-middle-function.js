'use strict';

const http = require('../libs/http-request');

module.exports.handlers = async (ctx, next) => {
  ctx.http_request = {};

  ctx.http_request.get = async (url, headers) => {
    return http(url, 'GET', headers);
  }

  ctx.http_request.post = async (url, headers, body) => {
    return http(url, 'POST', headers, body);
  }

  ctx.http_request.put = async (url, headers, body) => {
    return http(url, 'PUT', headers, body);
  }

  ctx.http_request.delete = async (url, headers, body) => {
    return http(url, 'DELETE', headers, body);
  }

  ctx.showResult = (ctx, data, status) => {
    ctx.status = status || 200;
    ctx.body = {
      success: true,
      data: data,
      message: ('string' === typeof (data)) ? data : undefined
    }
  };

  ctx.showError = (ctx, message, status) => {
    ctx.status = status || 500;
    ctx.body = {
      success: false,
      message: message
    }
  };
  await next();
}

module.exports.order = 1;
