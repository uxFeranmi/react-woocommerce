const auth = require('./modules/auth/auth');

const mountEndpoints = (app)=> {
  app.use('/api/auth/sign-in', auth.initiate);
  app.use('/api/auth/magic-:authKey', auth.finalize); 
}

module.exports = mountEndpoints;
