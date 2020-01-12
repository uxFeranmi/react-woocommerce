const { getWooCart } = require('../../services/woo_cart');

const getCart = async (req, res)=> {
  if (!) return res.status(401)

  const cart = req.auth ?
    await getWooCart(req.auth.id)
  : getCookieCart(req);

  res.status(200).json(cart);
};

module.exports = getCart;
