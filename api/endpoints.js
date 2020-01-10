const auth = require('./modules/auth/auth');

const mountEndpoints = (app)=> {
  app.use('/api/auth/sign-in', auth.initiate);
  app.use('/api/auth/magic-:authKey', auth.finalize); 
  app.use('/api/auth/set-cookie', auth.setCookie);
}

module.exports = mountEndpoints;
