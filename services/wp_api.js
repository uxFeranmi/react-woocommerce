import axios from 'axios';

const baseUrl = 'http://itsupplies.co/woo/wp-json/wp/v2';

const wpApi = async (method, endpoint, params = {}, body = {})=> {
  const res = await axios({
    method,
    baseURL: baseUrl,
    url: endpoint,
    params,
    data: body,
  });

  console.log(res.data);

  return res.data;
}

export default wpApi;
