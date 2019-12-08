const withSass = require('@zeit/next-sass');
require('dotenv').config();

const { WHICH_ENV } = process.env;

module.exports = withSass({
  // Get assets from itsupplies.co if in production environment.
  assetPrefix: WHICH_ENV === 'prod' ? 'http://itsupplies.co/' : '',

  // Expose env vars to app at build time.
  env: {
    WHICH_ENV,
  },
});
