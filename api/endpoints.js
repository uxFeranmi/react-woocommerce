const auth = require('./modules/auth/auth');
const cart = require('./modules/cart/cart');
const products = require('./modules/products/products');

const mountEndpoints = (app)=> {
  app.get('/api/auth', (req, res)=> res.status(200).json(!!req.auth));

  app.use('/api/auth/sign-in', auth.initiate);
  app.use('/api/auth/magic-:authKey', auth.finalize); 
  app.use('/api/auth/set-cookie', auth.setCookie);

  app.get('/api/cart', cart.get);
  app.post('/api/cart', cart.add);
  app.delete('/api/cart/:lineItemId', cart.remove);
  app.patch('/api/cart/:lineItemId', cart.update);

  app.get('products', products.list);
  app.get('products/:productId', products.getOne);
}

module.exports = mountEndpoints;
