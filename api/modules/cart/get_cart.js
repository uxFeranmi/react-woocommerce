const { getCartId } = require('../../services/woo_cart');
const wooApi = require('../../services/woo_api');

const getCart = async (req, res = null)=> {
  const cartId = req.auth ?
    await getCartId(req.auth.id)
  : req.cookies.cartId;

  const cart = cartId ?
    await wooApi.get(`orders/${cartId}`)
  : null;

  if (!res) return cart;

  res.status(200).json(cart);
};

module.exports = getCart;
