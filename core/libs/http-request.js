const axios = require('axios');
const ping = require('ping');

axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  if (error)
    return Promise.reject(error.response);
});


const DNS = {};
const httpRequest = async (url, method = 'GET', headers = {}, body = {}, bodyEnable = false, responseType) => {

  let timeout = 10000;
  const match = url.match(/([0-255]\.)/g);

  if (match && match.length === 3) { // if adress is an ip
    timeout = 30000;
  }

  if (url.indexOf('http') === -1 && url.indexOf('https') === -1) {
    url = 'http://' + url;
  }


  const host = url.split('/')[2] || 'null';

  if (!DNS[host]) {
    const alive = await new Promise((resolve) => {
      ping.sys.probe(host, (isAlive) => {
        resolve(isAlive);
      });
    });

    DNS[host] = alive;

    if (!DNS[host]) {
      return {
        status: 500,
        headers: {},
        body: {
          message: `Can not ping to host ${host}`
        }
      }
    }
  }

  method = method.toLocaleLowerCase();
  const sendBody = bodyEnable || ((method === 'post') || (method === 'put')) ? true : false;
  const requestOptions = {
    url: url,
    method: method,
    headers: headers,
    responseType
  };

  if (sendBody) requestOptions.data = body;
  const dataResponse = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 500,
        headers: {},
        body: {
          success: false,
          error: `Request time out after ${timeout}s.`
        }
      })
    }, timeout);

    axios(requestOptions).then(res => {
      if (res) {
        resolve({
          status: res.status,
          headers: res.headers,
          body: {
            success: true,
            data: res.data
          }
        })
      } else {
        resolve({
          stauts: 500,
          headers: res.headers,
          body: {
            success: false,
            data: "",
            error: 'Server error!'
          }
        })
      }
    }).catch(resErr => {
      if (resErr) {
        resolve({
          status: resErr && resErr.status ? resErr.status : 500,
          body: {
            success: false,
            data: "",
            error: resErr && (resErr.data || resErr.message) ? resErr.data || resErr.message : "Server error"
          }
        })
      }
    });
  })

  return dataResponse;
}

module.exports = httpRequest;
