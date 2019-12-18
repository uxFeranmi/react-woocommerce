

import './styles/featured_products.scss';

const FeaturedProducts = (props)=> {
  return (
    <section className="featured-products">
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

      <ul className="featured-category__products">
        {props.products.map((product, index)=> {              
          return (
            <li className="featured-category__list-item" key={product.id}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
      {props.products[0].name}
    </section>
  )
};

export default FeaturedProducts;
