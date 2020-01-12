const { addToCart, removeFromCart } = require('./update_cart');
const { getCart } = require('./get_cart');

const cart = {
  get: getCart,
  add: addToCart,
  remove: removeFromCart,
};

module.exports = cart;
