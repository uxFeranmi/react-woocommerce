import shop from './shop';

const fetchCart = async ()=> {
  let cart = await shop.get('cart');
  
  if (!cart) return {line_items: [1, 2]};

  cart.line_items.forEach(async (item, index)=> {
    item.product = await shop.get(`products/${item.product_id}`);

    cart.line_items[index] = item;
  });

  return cart;
}

export default fetchCart;