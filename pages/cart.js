import Link from 'next/link';
import { useState, useEffect } from 'react';

import AppShell from '../app_shell';
import getCategoryTree from '../utils/category_tree';

import getCart from '../utils/get_cart';

import './styles/cart.scss';

const Cart = (_props)=> {
  let [categoryTree, setCategoryTree] = useState([]);
  let [isAuth, setAuth] = useState(false);

  let [lineItems, setLineItems] = useState([1, 2]);
  let [coupons, setCoupons] = useState([]);
  let [cartTotals, setCartTotals] = useState({});

  useEffect(()=> {
    getCategoryTree().then(setCategoryTree);
    getCart(isAuth).then((cart)=> {
      setLineItems(cart.lineItems);
      setCoupons(cart.appliedCoupons);
      setCartTotals(cart.totals);
    });
  }, []);

  return (
    <AppShell {...{setAuth, categoryTree}}>
      <section className="cart">
        <p>{''+isAuth}</p>

        <table className="cart__line-items-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((lineItem, index)=> (
              <tr className="cart__line-item" key={index}>
                <td>
                  <img
                    src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/c_pad,dpr_1.0,f_auto,h_77,q_auto,w_88/media/catalog/product/F/W/_1576485754.jpg"
                  />
                  <span>Cosmos</span>
                </td>
                <td>
                  <span className="is-label"
                    aria-hidden="true"
                  >
                    Unit Price: 
                  </span>
                  <span>$50</span>
                </td>
                <td>
                  <span className="is-label"
                    aria-hidden="true"
                  >
                    Quantity: 
                  </span>
                  <span>1</span>
                </td>
                <td>
                  <span className="is-label"
                    aria-hidden="true"
                  >
                    Subtotal: 
                  </span>
                  <span>$50</span>
                </td>
                <td className="cart__line-item__actions">
                  <button>Remove from cart</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AppShell>
  );
};

export default Cart;