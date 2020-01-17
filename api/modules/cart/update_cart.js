const { getCartId, setCartId } = require('../../services/woo_cart');
const wooApi = require('../../services/woo_api');

const addToCart = async (req, res)=> {
  const {productId, quantity} = req.body;
  let cart;
  const cartId = await getCartId(req.auth, req.cookies);

  const payload = {
    line_items: [
      {
        product_id: productId,
        quantity,
      },
    ],
  };
  
  if (!cartId) {
    cart = await wooApi.post("orders", payload);
    await setCartId(cart.id, req.auth, res);
  }
  else
    cart = await wooApi.put(`orders/${cartId}`, payload);

  res.status(200).json(cart);
};

const removeFromCart = async (req, res)=> {
  const {lineItemId} = req.params;
  let cart;
  const cartId = await getCartId(req.auth, req.cookies);

  const payload = {
    line_items: [
      {
        id: lineItemId,
        product_id: null,
        quantity: 0,
      },
    ],
  };
  
  cart = await wooApi.put(`orders/${cartId}`, payload);

  res.status(200).json(cart);
};

const updateLineItem = async (req, res)=> {
  const {lineItemId} = req.params;
  const {productId, quantity} = req.body;
  let cart;
  const cartId = await getCartId(req.auth, req.cookies);

  const payload = {
    line_items: [
      {
        id: lineItemId,
        product_id: productId,
        quantity,
      },
    ],
  };
  
  cart = await wooApi.put(`orders/${cartId}`, payload);

  res.status(200).json(cart);
};

module.exports = { addToCart, removeFromCart, updateLineItem };
