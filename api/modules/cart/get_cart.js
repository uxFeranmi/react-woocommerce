const { getWooCart } = require('../../services/woo_cart');

const getCart = async (req, res)=> {
  if (!req.auth) 
    return res.status(401)
      .send('User is not signed in.');

  const cart = await getWooCart(req.auth.id);

  res.setHeader('Content-Type', 'application/json');
  res.send(cart); //Cart is json string. No need to use res.json().
};

module.exports = getCart;
