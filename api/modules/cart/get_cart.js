const { getCartId } = require('../../services/woo_cart');
const wooApi = require('../../services/woo_api');

const getCart = async (req, res = null)=> {
  const cartId = await getCartId(req.auth, req.cookies);

  const cart = cartId ?
    await wooApi.get(`orders/${cartId}`)
    : null;

  if (!res) return cart;

  res.status(200).json(cart);
};

module.exports = getCart;
