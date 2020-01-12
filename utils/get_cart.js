const getCart = async (isAuth)=> {
  let cart = {
    lineItems: [],
    appliedCoupons: [],
    totals: {},
  };

  if (isAuth) {
    // Hit the backend for data.
  }

  else {
    // Retrieve data from localStorgage.
  }

  return cart;
};

export default getCart;
