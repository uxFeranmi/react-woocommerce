import Link from 'next/link';

import ProductCard from '../../components/product_card';

const Products = (props)=> {
  return (
    <section className="products-section" style={{margin: '20px'}}>
      <div className="products-section__header">
        <h2 className="products-section__title">
          Products
        </h2>
      </div>

      <ul className="products-section__list" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
        {props.products.map((product, index)=> {
          return (
            <li className="products-section__list-item" key={product.id} style={{display: 'block'}}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
