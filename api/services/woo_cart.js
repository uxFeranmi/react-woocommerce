const wooApi = require('./woo_api');

const getCartId = async (auth, cookies)=> {
  if (!auth) return cookies.cartId;

  const customer = await wooApi.get(`customers/${auth.id}`);

  for (metaData of customer.meta_data)
    if (metaData.key === 'cartId')
      return metaData.value;
  //

  return null;
};

const setCartId = async (cartId, auth, res)=> {
  if (!auth)
    return res.cookie('cartId', cartId);

  const data = {
    meta_data: [
      {
        key: "cartId",
        value: cartId,
      },
    ],
  };

  await wooApi.put(`customers/${auth.id}`, data)
};


module.exports = { getCartId, setCartId };
