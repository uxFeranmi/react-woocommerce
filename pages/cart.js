import Link from 'next/link';
import { useState, useEffect } from 'react';

import AppShell from '../app_shell';
import getCategoryTree from '../utils/category_tree';

const Cart = (_props)=> {
  let [categoryTree, setCategoryTree] = useState([]);

  useEffect(()=> {
    getCategoryTree().then(setCategoryTree);

  }, []);

  return (
    <AppShell categories={categoryTree}>
      Cart here.
    </AppShell>
  );
};

export default Cart;