import Link from 'next/link';
import {useState} from 'react';

import ProductCard from '../../components/product_card';
import './styles/featured_category.scss';          

const FeaturedCategory = (props)=> {
  let [navListExpanded, setNavListExpanded] = useState(false);

  const toggleNavList = ()=> {
    setNavListExpanded(!navListExpanded);
  }

  return (
    <section className="featured-category">
      <div className="featured-category__header">
        <h2 className="featured-category__title">
          Servers
        </h2>

        <div className="featured-category__nav">
          <button className="featured-category__nav__toggle-list"
            onClick={toggleNavList}
          >
            Types <i className={`fa ${navListExpanded ? 'fa-window-close' : 'fa-chevron-down'}`}></i>
          </button>
          <ul className={`${navListExpanded ? 'is-expanded' : ''}`}>
            <li>Rack Servers</li>
            <li>Tower Servers</li>
            <li>Blade Servers</li>
          </ul>
          <Link href="servers">
            <a className="featured-category__nav__see-all">
              See all &#10132;
            </a>
          </Link>
        </div>
      </div>

      <img src="http://itsupplies.co/woo/wp-content/uploads/2019/08/album_2_flat.jpg"
        alt="" className="featured-category__image"
      />

      <ul className="featured-category__products">
        {props.products.map((product, index)=> {              
          return (
            <li className="featured-category__list-item" key={product.id}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default FeaturedCategory;
