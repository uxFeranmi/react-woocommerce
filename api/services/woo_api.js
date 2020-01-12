const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

// @ts-ignore
const wooApi = new WooCommerceRestApi({
  url: "http://itsupplies.co/woo",
  consumerKey: process.env.WOO_CONSUMER_KEY,
  consumerSecret: process.env.WOO_CONSUMER_SECRET,
  wpAPI: true, // Enable the WP REST API integration
  version: "wc/v3"
});

module.exports = wooApi;