const withSass = require('@zeit/next-sass');
require('dotenv').config();

const { 
  NODE_ENV: nodeEnv,
  WOO_CONSUMER_SECRET,
  WOO_CONSUMER_KEY,
  FEATURED_CATEGORY_ID,
} = process.env;

console.log(nodeEnv);

module.exports = withSass({
  /*webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config = {
      ...config,
      target: 'node',
      node: {
        __dirname: false,
        __filename: false,
      }
    };
    return config;
  },*/
  compress: false,

  // Get assets from itsupplies.co if in production environment.
  assetPrefix: nodeEnv === 'production' ? 'http://itsupplies.co/' : '',

  // Expose env vars to app at build time.
  env: {
    WOO_CONSUMER_SECRET,
    WOO_CONSUMER_KEY,
    staticPath: nodeEnv === 'production' ? 'http://itsupplies.co/static' : '',
    FEATURED_CATEGORY_ID,
    nodeEnv,
  },
});
