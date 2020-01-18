const wooApi = require('../../services/woo_api');

const listProducts = async (req, res)=> {
  let {data: products} = await wooApi.get("products", req.query);
  
  res.status(200).json(products);
}

module.exports = listProducts;