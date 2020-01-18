const listProducts = require('./list_products');
const getProduct = require('./get_product');

const products = {
  getOne: getProduct,
  list: listProducts,
};

module.exports = products;
