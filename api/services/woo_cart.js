const wooApi = require('./woo_api');

const getWooCart = async (customerId)=> {
  const customer = await wooApi.get(`customers/${customerId}`);

  for (metaData of customer.meta_data) {
    if (metaData.key === 'cart') {
      return metaData.value;
    }
  }
};

const setWooCart = async (cart, customerId)=> {
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

module.exports = { getWooCart, setWooCart };
