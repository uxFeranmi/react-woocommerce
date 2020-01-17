const { addToCart, removeFromCart, updateLineItem } = require('./update_cart');
const getCart = require('./get_cart');

const cart = {
  get: getCart,
  add: addToCart,
  remove: removeFromCart,
  update: updateLineItem
};

module.exports = cart;
