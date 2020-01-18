
    shop.get('cart').then(async (cart)=> {
        if (!cart) return;
  
        const lineItems = await getLineItems(cart.line_items);
        setLineItems(lineItems);
  
        setCoupons(cart.coupon_lines);
      });