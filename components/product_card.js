import Link from 'next/link';

import './styles/product_card.scss';

const ProductCard = (props)=> {
  const {product} = props;
  const {categories, images} = product;

  return (<div className="product-card">
    <small className="product-card__categories">
      {categories.map((category, index)=> (
        <Link href="categories/[id]" as={`categories/${category.slug}_${category.id}`}
          key={category.id}
        >
          <a>
            {`${category.name}${index + 1 < categories.length ? ', ' : ''}`}
          </a>
        </Link>
      ))}
    </small>

    {/*href="products/[id]" as={`products/${product.slug}_${product.id}`}*/}
    <Link href={product.permalink} prefetch={false}>
      <a className="product-card__thumbnail">
        <img src={images[0].src}
          alt={images[0].alt || `Image showing ${product.name}`}
        />
      </a>
    </Link>

    <Link href="products/[id]" as={`products/${product.id}`}>
      <a className="product-card__name">
        {product.name}
      </a>
    </Link>

    <span className="product-card__price">
      &#8358;{product.price /*product.sale_price*/}
      {/*<small>&#8358;{console.log('price', product.regular_price)}</small>
        <small>&#8358;{product.sale_price}</small>*/}
    </span>

    <div className="product-card__actions">
      <button className="product-card__wishlist">
        <i className="fa fa-shopping-cart"></i>
        <span>Order</span>
      </button>

      <button className="product-card__compare">
        <i className="fa fa-heart"></i>
        <span>Wishlist</span>
      </button>

      <button className="product-card__order">
        <i className="fa fa-check-square-o"></i>
        <span>Compare</span>
      </button>
    </div>
  </div>);
};

export default ProductCard;