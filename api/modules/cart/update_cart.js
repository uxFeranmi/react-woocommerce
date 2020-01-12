const getCart = require('./get_cart');

const addToCart = (req, res)=> {
  let cart = getCart(req);

};

const removeFromCart = (req, res)=> {
  let cart = getCart(req);

};

module.exports = { addToCart, removeFromCart };
