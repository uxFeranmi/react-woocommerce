const { getCartId, setCartId } = require('../../services/woo_cart');
const getCart = require('./get_cart');

const addToCart = async (req, res)=> {
  if (!req.auth)

  res.status(200).json(cart);
};

const removeFromCart = async (req, res)=> {
  if (!req.auth)

  res.status(200).json(cart);
};

module.exports = { addToCart, removeFromCart };
