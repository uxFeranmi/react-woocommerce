import {useState} from 'react';

import ProductCard from '../../components/product_card';
import './styles/featured_products.scss';

const FeaturedProducts = (props)=> {
  let [tab, switchTab] = useState(1);

  return (
    <section className="featured-products">
      <div className="featured-products__header">
        <h2 className="featured-products__title">
          <button className={`featured-products__tab ${tab === 1 ? 'is-current-tab' : ''}`}
            onClick={()=> switchTab(1)}
          >
            Featured Products
          </button>
          <button className={`featured-products__tab ${tab === 2 ? 'is-current-tab' : ''}`}
            onClick={()=> switchTab(2)}
          >
            Special Offers
          </button>
          <button className={`featured-products__tab ${tab === 3 ? 'is-current-tab' : ''}`}
            onClick={()=> switchTab(3)}
          >
            Weekly Deals
          </button>
        </h2>
      </div>

      <ul className="featured-products__list">
        {(()=> { //IIFE
          switch (tab) {
            case 1: //featured
              return props.products.map((product, index)=> {
                return (
                  <li className="featured-products__list-item" key={product.id}>
                    <ProductCard product={product} />
                  </li>
                );
              });
          
            case 2: //special offers
              return props.products.map((product, index)=> {
                if (index % 2  !== 0) return '';              
                return (
                  <li className="featured-products__list-item" key={product.id}>
                    <ProductCard product={product} />
                  </li>
                );
              });
              
            case 3: //weekly deals
              return props.products.map((product, index)=> {              
                if (index % 2  !== 0 || index % 3  !== 0) return '';
                return (
                  <li className="featured-products__list-item" key={product.id}>
                    <ProductCard product={product} />
                  </li>
                );
              });

            default: //featured
              return props.products.map((product, index)=> {              
                return (
                  <li className="featured-products__list-item" key={product.id}>
                    <ProductCard product={product} />
                  </li>
                );
              });
            // 
          }
        })()}
      </ul>
    </section>
  )
};

export default FeaturedProducts;
