const getCart = require('./get_cart');

const sendCart = (res, cart)=> {
  const cartString = JSON.stringify(cart);

  res.setHeader('Content-Type', 'application/json');

  res.status(200)
    .cookie('cart', cartString, { maxAge: 31540000 })
    .send(cartString);
  //
}

const addToCart = (req, res)=> {
  let cart = getCart(req);

  sendCart(res, cart);
};

const removeFromCart = (req, res)=> {
  let cart = getCart(req);

  sendCart(res, cart);
};

module.exports = { addToCart, removeFromCart };
