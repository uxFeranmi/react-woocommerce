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

const fetchCartItems = async (cartContentIds)=> {
  const {lineItemIds, couponIds} = cartContentIds;

  const lineItems = await wooApi.get('products', {include: lineItemIds});
  const appliedCoupons = await wooApi.get('coupons', {include: couponIds});
  
  return {lineItems, appliedCoupons};
};

module.exports = { getWooCart, setWooCart, fetchCartItems };
