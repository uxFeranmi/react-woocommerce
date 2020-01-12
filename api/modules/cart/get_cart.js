const { getWooCart, fetchCartItems } = require('../../services/woo_cart');

const calculateCartTotals = (cart)=> {

};

const getCart = async (req, res)=> {
  const cartContentIds = req.auth ?
    await getWooCart(req.auth.id)
  : req.cookie.cart;

  const cart = await fetchCartItems(cartContentIds);
  cart.totals = calculateCartTotals(cart);

  res.status(200).json(cart);
};

module.exports = getCart;
