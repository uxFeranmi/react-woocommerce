import Link from 'next/link';

import './styles/product_card.scss';

const ProductCard = (props)=> {
  const {product} = props;
  const {categories, images} = product;

  return (<div className={`${props.className} product-card`}>
    <span className="product-card__categories">
      {categories.map((category)=> (
        <Link href="categories/[id]" as={`categories/${category.slug}_${category.id}`}
          key={category.id}
        >
          <a>
            {`${category.name}, `}
          </a>
        </Link>
      ))}
    </span>

    {/*href="products/[id]" as={`products/${product.slug}_${product.id}`}*/}
    <Link href={product.permalink} prefetch={false}>
      <a className="product-card__thumbnail">
        <img src={images[0].src}
          alt={images[0].alt || `Image showing ${product.name}`}
        />
      </a>
    </Link>

    {/*{id, categories, name, permalink, price, sale_price, images}
    image: {
      id: 181,
      date_created: '2019-12-07T06:06:07',
      date_created_gmt: '2019-12-07T04:06:07',
      date_modified: '2019-12-07T06:06:08',
      date_modified_gmt: '2019-12-07T04:06:08',
      src: 'http://itsupplies.co/woo/wp-content/uploads/2019/08/album_2_angle.jpg',
      name: 'Greatest Hits &#8211; Volume 2',
      alt: ''
    },
    categories: [ { id: 11, name: 'Music', slug: 'music' } ]
    */}

    <Link href="products/[id]" as={`products/${product.id}`}>
      <a className="product-card__name">
        {product.name}
      </a>
    </Link>

    <span className="product-card__price">
      {product.price /*product.regular_price*/}
      <small>{product.sale_price}</small>
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