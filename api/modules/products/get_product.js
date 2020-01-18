const wooApi = require('../../services/woo_api');

const getProduct = async (req, res)=> {
  const {productId} = req.params;

  let {data: product} = await wooApi.get(`products/${productId}`, req.query);
  
  res.status(200).json(product);
}

module.exports = getProduct;