const auth = require('./auth/auth');

const mountEndpoints = (app)=> {
  app.use('/api/auth/sign-in', auth.initiateFlow);
  app.use('/api/auth/magic-:authKey', auth.finalize);  
}

module.exports = mountEndpoints;
