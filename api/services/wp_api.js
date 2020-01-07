const axios = require('axios');

const baseUrl = 'http://itsupplies.co/woo/wp-json/wp/v2';

const wpApi = async (method, endpoint, params = {}, body = {})=> {
  // @ts-ignore
  const res = await axios({
    method,
    baseURL: baseUrl,
    url: endpoint,
    params,
    data: body,
  });

  return res.data;
}

module.exports = wpApi;
