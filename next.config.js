const withSass = require('@zeit/next-sass');
require('dotenv').config();

const { 
  NODE_ENV: nodeEnv
} = process.env;

console.log(nodeEnv);

module.exports = withSass({
  // Get assets from itsupplies.co if in production environment.
  assetPrefix: nodeEnv === 'production' ? 'http://itsupplies.co/' : '',

  // Expose env vars to app at build time.
  env: {
    nodeEnv,
    staticPath: nodeEnv === 'production' ? 'http://itsupplies.co/static/' : '',
  },
});
