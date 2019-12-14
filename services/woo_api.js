import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
 
const wooApi = new WooCommerceRestApi({
  url: "http://itsupplies.co/woo",
  consumerKey: "ck_973f2a904ba62062ec8116e350dea6709675c1fa",
  consumerSecret: "cs_867ba1e5648a69e1486aebc16ebb0269e21dc826",
  version: "wc/v3"
});

export default wooApi;