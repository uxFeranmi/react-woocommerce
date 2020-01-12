const wooApi = require('../../services/woo_api');

const getCart = async (req, res = null)=> {
  let cart;

  if (req.auth) {
    const { customerId } = req.auth;
    const customer = await wooApi.get(`customers/${customerId}`);

    for (metaData of customer.meta_data) {
      if (metaData.key === 'cart') {
        cart = metaData.value;
        break;
      }
    }
  }
  else {
    cart = req.cookies.cart;
  }

  if (!res) return JSON.parse(cart);

  res.setHeader('Content-Type', 'application/json');
  res.send(cart); //Cart is json string. No need to use res.json().
};

module.exports = getCart;