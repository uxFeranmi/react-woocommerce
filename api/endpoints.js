const auth = require('./modules/auth/auth');
const cart = require('./cart/cart');

const mountEndpoints = (app)=> {
  app.get('/api/auth', (req, res)=> res.json(!!req.auth));
  
  app.use('/api/auth/sign-in', auth.initiate);
  app.use('/api/auth/magic-:authKey', auth.finalize); 
  app.use('/api/auth/set-cookie', auth.setCookie);

  app.get('/api/cart', cart.get);
  app.post('/api/cart', cart.add);
  app.delete('/api/cart/:productId', cart.remove);
}

module.exports = mountEndpoints;
