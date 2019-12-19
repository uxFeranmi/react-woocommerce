import Link from 'next/link';

import ProductCard from '../../components/product_card';

import './styles/products.scss';

const Products = (props)=> {
  return (
    <section className="products-section">
      <div className="products-section__header">
        <h2 className="products-section__title">
          {props.category.name}
        </h2>
      </div>

      <ul className="products-section__list">
        {props.products.map((product, index)=> {
          return (
            <li className="products-section__list-item" key={product.id}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
