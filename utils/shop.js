const axios = require('axios');

const baseUrl = `${process.env.DOMAIN_NAME}/api`;

const shopApi = async (method, endpoint, params = {}, body = {})=> {
  const res = await axios({
    method,
    baseURL: baseUrl,
    url: endpoint,
    params,
    data: body,
  });

  return res.data;
};

const shop = {
  get: (...params)=> shopApi('get', ...params),

  post: (...params)=> shopApi('post', ...params),

  put: (...params)=> shopApi('put', ...params),

  patch: (...params)=> shopApi('patch', ...params),

  delete: (...params)=> shopApi('delete', ...params),

  head: (...params)=> shopApi('head', ...params),

  options: (...params)=> shopApi('options', ...params),

  connect: (...params)=> shopApi('connect', ...params),

  trace: (...params)=> shopApi('trace', ...params),
};

module.exports = shop;
