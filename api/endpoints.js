const auth = require('./auth/auth');

const mountEndpoints = (app)=> {
  app.use('/api/auth/sign-in', auth.initiateFlow);
}

module.exports = mountEndpoints;
