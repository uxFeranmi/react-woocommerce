const { getWooCart, setWooCart } = require('../../services/woo_cart');

const addToCart = async (req, res)=> {
  if (!req.auth) 
    return res.status(401)
      .send('User is not signed in.');

  const {id: customerId} = req.auth;
  const {productId, quantity} = req.body;

  let cart = JSON.parse(await getWooCart(customerId));

  cart[productId] = quantity;
  
  await setWooCart(cart, customerId);
  res.status(200).json(cart);
};

const removeFromCart = async (req, res)=> {
  if (!req.auth) 
    return res.status(401)
      .send('User is not signed in.');

  const {id: customerId} = req.auth;
  const {productId} = req.query;

  let cart = JSON.parse(await getWooCart(customerId));

  delete cart[productId];

  await setWooCart(cart, customerId);
  res.status(200).json(cart);
};

module.exports = { addToCart, removeFromCart };
