import './styles/product_price.scss';

const ProductPrice = (props)=> {
  const { price, oldPrice } = props;

  return (
    <div className={`${props.className} product-price`}
      title="Product price"
      aria-label="Product price"
    >
      <b className="product-price__current"
        title="Current price"
        aria-label="Current price"
      >
        &#8358;{price}
      </b>

      {
        oldPrice ?
          <s className="product-price__regular"
            title="Regular price"
            aria-label="Regular price"
          >
            &#8358;{oldPrice}
          </s>
        : ''
      }
    </div>
  );
}

export default ProductPrice;
