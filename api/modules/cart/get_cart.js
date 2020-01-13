const { getWooCart, fetchCartItems } = require('../../services/woo_cart');

const calculateCartTotals = (cart)=> {
  const {lineItems, appliedCoupons} = cart;

  const subtotal = lineItems.reduce((sum, lineItem)=> {
    
  });

  const discounts = appliedCoupons.reduce((sum, coupon)=> {

  });

  const total = subtotal - discounts;

  return {subtotal, discounts, total};
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
