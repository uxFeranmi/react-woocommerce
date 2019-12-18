import Link from 'next/link';

import ProductCard from '../../components/product_card';
import './styles/bestsellers.scss';

const Bestsellers = (props)=> {
  return (
    <section className="bestsellers">
      <div className="bestsellers__header">
        <h2 className="bestsellers__title">
          Bestsellers
        </h2>
      </div>

      <ul className="bestsellers__list">
        {props.products.map((product, index)=> {
          //Skip final product if odd-numbered.
          if (index + 1 === props.products.length)
            return '';
            
          return (
            <li className="bestsellers__list-item" key={product.id}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Bestsellers;
