const { getCartId, setCartId } = require('../../services/woo_cart');
const getCart = require('./get_cart');
const wooApi = require('../../services/woo_api');

const addToCart = async (req, res)=> {
  const {productId, quantity} = req.body;

  let cart = getCart(req);
  //const product = await wooApi.get(`products/${productId}`);

  const payload = {
    line_items: [
      {
        product_id: productId,
        quantity,
      },
    ],
  };
  
  if (!cart) {
    cart = await wooApi.post("orders", payload);
    await setCartId(cart.id, req.auth.id);
  }
  else
    cart = await wooApi.put(`orders/${cart.id}`, payload);

  res.status(200).json(cart);
};

const removeFromCart = async (req, res)=> {
  const data = {
    "line_items":[
      {
        "id":19,
        "product_id":null,
        "quantity":0
      }
    ]
  };

  res.status(200).json(cart);
};

module.exports = { addToCart, removeFromCart };
