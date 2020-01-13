const wooApi = require('./woo_api');

const getCartId = async (customerId)=> {
  const customer = await wooApi.get(`customers/${customerId}`);

  for (metaData of customer.meta_data)
    if (metaData.key === 'cartId')
      return metaData.value;
  //

  return null;
};

const setCartId = async (cartId, customerId)=> {
  const data = {
    meta_data: [
      {
        key: "cartId",
        value: cartId,
      },
    ],
  };

  await wooApi.put(`customers/${customerId}`, data)
};


module.exports = { getCartId, setCartId };
