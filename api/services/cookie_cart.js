const wooApi = require('./Cookie_api');

const getCookieCart = async (customerId)=> {
  const customer = await wooApi.get(`customers/${customerId}`);

  for (metaData of customer.meta_data) {
    if (metaData.key === 'cart') {
      return metaData.value;
    }
  }
};

const setCookieCart = async (cart, customerId)=> {
  const data = {
    meta_data: [
      {
        key: "cart",
        value: JSON.stringify(cart),
      },
    ],
  };

  await wooApi.put(`customers/${customerId}`, data)
};

module.exports = { getCookieCart, setCookieCart };
